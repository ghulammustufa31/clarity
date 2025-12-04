import { nanoid } from 'nanoid';
import { db } from '@/src/lib/db';
import { verificationTokens, passwordResetTokens } from '@/src/lib/db/schema';
import { eq, and, gt } from 'drizzle-orm';

const TOKEN_LENGTH = 32;
const VERIFICATION_TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours
const RESET_TOKEN_EXPIRY = 1 * 60 * 60 * 1000; // 1 hour

/**
 * Generate a secure random token
 */
export function generateToken(): string {
  return nanoid(TOKEN_LENGTH);
}

/**
 * Create an email verification token
 */
export async function createVerificationToken(userId: string): Promise<string> {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + VERIFICATION_TOKEN_EXPIRY);

  await db.insert(verificationTokens).values({
    userId,
    token,
    expiresAt,
  });

  return token;
}

/**
 * Verify an email verification token
 */
export async function verifyEmailToken(token: string): Promise<{
  isValid: boolean;
  userId?: string;
  error?: string;
}> {
  const [tokenRecord] = await db
    .select()
    .from(verificationTokens)
    .where(
      and(
        eq(verificationTokens.token, token),
        gt(verificationTokens.expiresAt, new Date())
      )
    )
    .limit(1);

  if (!tokenRecord) {
    return { isValid: false, error: 'Invalid or expired token' };
  }

  // Delete the token after verification
  await db.delete(verificationTokens).where(eq(verificationTokens.id, tokenRecord.id));

  return { isValid: true, userId: tokenRecord.userId };
}

/**
 * Create a password reset token
 */
export async function createPasswordResetToken(userId: string): Promise<string> {
  // Delete any existing reset tokens for this user
  await db.delete(passwordResetTokens).where(eq(passwordResetTokens.userId, userId));

  const token = generateToken();
  const expiresAt = new Date(Date.now() + RESET_TOKEN_EXPIRY);

  await db.insert(passwordResetTokens).values({
    userId,
    token,
    expiresAt,
  });

  return token;
}

/**
 * Verify a password reset token
 */
export async function verifyPasswordResetToken(token: string): Promise<{
  isValid: boolean;
  userId?: string;
  error?: string;
}> {
  const [tokenRecord] = await db
    .select()
    .from(passwordResetTokens)
    .where(
      and(
        eq(passwordResetTokens.token, token),
        gt(passwordResetTokens.expiresAt, new Date())
      )
    )
    .limit(1);

  if (!tokenRecord) {
    return { isValid: false, error: 'Invalid or expired token' };
  }

  return { isValid: true, userId: tokenRecord.userId };
}

/**
 * Delete a password reset token after use
 */
export async function deletePasswordResetToken(token: string): Promise<void> {
  await db.delete(passwordResetTokens).where(eq(passwordResetTokens.token, token));
}
