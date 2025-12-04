import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/lib/db';
import { users } from '@/src/lib/db/schema';
import { verifyEmailToken } from '@/src/lib/utils/tokens';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate token
    if (!body.token || typeof body.token !== 'string' || body.token.length === 0) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    const token = body.token;

    // Verify token
    const result = await verifyEmailToken(token);

    if (!result.isValid || !result.userId) {
      return NextResponse.json(
        { error: result.error || 'Invalid token' },
        { status: 400 }
      );
    }

    // Update user's email verification status
    await db
      .update(users)
      .set({ emailVerified: true })
      .where(eq(users.id, result.userId));

    return NextResponse.json(
      { message: 'Email verified successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'An error occurred during email verification' },
      { status: 500 }
    );
  }
}
