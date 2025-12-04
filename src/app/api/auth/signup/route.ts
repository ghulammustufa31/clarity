import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/lib/db';
import { users } from '@/src/lib/db/schema';
import { hashPassword, validatePassword } from '@/src/lib/utils/password';
import { createVerificationToken } from '@/src/lib/utils/tokens';
import { sendVerificationEmail } from '@/src/lib/email';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const errors: { field: string; message: string }[] = [];

    if (!body.email || typeof body.email !== 'string') {
      errors.push({ field: 'email', message: 'Email is required' });
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email)) {
        errors.push({ field: 'email', message: 'Invalid email address' });
      }
    }

    if (!body.name || typeof body.name !== 'string') {
      errors.push({ field: 'name', message: 'Name is required' });
    } else if (body.name.length < 2) {
      errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
    } else if (body.name.length > 100) {
      errors.push({ field: 'name', message: 'Name must not exceed 100 characters' });
    }

    // Validate password
    const passwordValidation = validatePassword(body.password);
    if (!passwordValidation.isValid) {
      passwordValidation.errors.forEach(error => {
        errors.push({ field: 'password', message: error });
      });
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: errors,
        },
        { status: 400 }
      );
    }

    const { email, name, password } = body;
    const normalizedEmail = email.toLowerCase();

    // Check if user already exists
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, normalizedEmail))
      .limit(1);

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);
    console.log('Signup - Password hashed:', {
      originalPasswordLength: password.length,
      hashedPasswordLength: passwordHash.length,
      hashedPasswordPrefix: passwordHash.substring(0, 10)
    });

    // Create user
    const [newUser] = await db
      .insert(users)
      .values({
        email: normalizedEmail,
        name,
        passwordHash,
        emailVerified: false,
      })
      .returning();

    console.log('Signup - User created:', {
      id: newUser.id,
      email: newUser.email,
      hasPasswordHash: !!newUser.passwordHash
    });

    // Generate verification token
    const verificationToken = await createVerificationToken(newUser.id);

    // Send verification email
    const emailResult = await sendVerificationEmail(
      newUser.email,
      newUser.name,
      verificationToken
    );

    if (!emailResult.success) {
      console.error('Failed to send verification email:', emailResult.error);
      // Don't fail the signup if email sending fails
    }

    return NextResponse.json(
      {
        message: 'Account created successfully. Please check your email to verify your account.',
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'An error occurred during signup' },
      { status: 500 }
    );
  }
}
