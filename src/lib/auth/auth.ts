import NextAuth, { type DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { db } from '@/src/lib/db';
import { users } from '@/src/lib/db/schema';
import { verifyPassword } from '@/src/lib/utils/password';
import { eq } from 'drizzle-orm';

// Extend NextAuth types to include custom properties
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      emailVerified: boolean;
    } & DefaultSession['user'];
  }

  interface User {
    emailVerified: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    emailVerified: boolean;
    rememberMe?: boolean;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // Default: 30 days
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        rememberMe: { label: 'Remember me', type: 'checkbox' },
      },
      async authorize(credentials) {
        // Add this at the very start
        console.log('=== AUTHORIZE FUNCTION CALLED ===');
        console.log('Credentials received:', {
          email: credentials?.email,
          hasPassword: !!credentials?.password,
          passwordLength: credentials?.password?.length,
          rememberMe: credentials?.rememberMe,
        });

        // Validate credentials
        if (!credentials?.email || typeof credentials.email !== 'string') {
          console.log('❌ Validation failed: Invalid email');
          return null;
        }

        if (!credentials?.password || typeof credentials.password !== 'string' || credentials.password.length === 0) {
          console.log('❌ Validation failed: Invalid password');
          return null;
        }

        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(credentials.email)) {
          console.log('❌ Validation failed: Invalid email format');
          return null;
        }

        const email = credentials.email;
        const password = credentials.password;
        const rememberMe = credentials.rememberMe === true || credentials.rememberMe === 'true';

        console.log('✅ Validation passed for email:', email);

        // Find user by email
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, email.toLowerCase()))
          .limit(1);

        if (!user) {
          console.log('Login failed: User not found for email:', email.toLowerCase());
          return null;
        }

        console.log('User found:', {
          id: user.id,
          email: user.email,
          hasPasswordHash: !!user.passwordHash,
          passwordHashLength: user.passwordHash?.length
        });

        // Verify password
        const isValidPassword = await verifyPassword(password, user.passwordHash);

        console.log('Password verification result:', isValidPassword);

        if (!isValidPassword) {
          return null;
        }

        // Return user object (will be passed to JWT callback)
        const returnValue = {
          id: user.id,
          email: user.email,
          name: user.name,
          emailVerified: user.emailVerified,
          rememberMe,
        } as any;

        console.log('✅ Returning user object:', returnValue);
        return returnValue;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.emailVerified = user.emailVerified;
        token.rememberMe = (user as any).rememberMe;
      }

      // Handle session updates (e.g., after email verification)
      if (trigger === 'update' && token.id) {
        const [updatedUser] = await db
          .select()
          .from(users)
          .where(eq(users.id, token.id))
          .limit(1);

        if (updatedUser) {
          token.emailVerified = updatedUser.emailVerified;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.emailVerified = token.emailVerified;
      }

      return session;
    },

    async signIn({ user }) {
      // Allow sign in even if email not verified
      // We'll handle email verification check in middleware
      return true;
    },
  },
  events: {
    async signIn({ user }) {
      console.log(`User signed in: ${user.email}`);
    },
  },
});
