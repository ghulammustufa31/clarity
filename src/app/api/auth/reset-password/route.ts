import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/lib/db';
import { users } from '@/src/lib/db/schema';
import { hashPassword, validatePassword } from '@/src/lib/utils/password';
import { verifyPasswordResetToken, deletePasswordResetToken } from '@/src/lib/utils/tokens';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const errors: { field: string; message: string }[] = [];

    if (!body.token || typeof body.token !== 'string' || body.token.length === 0) {
      errors.push({ field: 'token', message: 'Token is required' });
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

    const { token, password } = body;

    // Verify token
    const result = await verifyPasswordResetToken(token);

    if (!result.isValid || !result.userId) {
      return NextResponse.json(
        { error: result.error || 'Invalid or expired token' },
        { status: 400 }
      );
    }

    // Hash new password
    const passwordHash = await hashPassword(password);

    // Update user's password
    await db
      .update(users)
      .set({ passwordHash })
      .where(eq(users.id, result.userId));

    // Delete the reset token
    await deletePasswordResetToken(token);

    return NextResponse.json(
      { message: 'Password reset successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'An error occurred resetting your password' },
      { status: 500 }
    );
  }
}
