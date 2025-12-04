'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  // Password strength indicators
  const passwordChecks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^a-zA-Z0-9]/.test(password),
  };

  const validateForm = () => {
    const errors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!name) {
      errors.name = 'Name is required';
    } else if (name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    } else if (name.length > 100) {
      errors.name = 'Name must not exceed 100 characters';
    }

    if (!email) {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = 'Invalid email address';
      }
    }

    if (!password) {
      errors.password = 'Password is required';
    } else {
      if (password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      } else if (password.length > 100) {
        errors.password = 'Password must not exceed 100 characters';
      } else if (!/[a-z]/.test(password)) {
        errors.password = 'Password must contain at least one lowercase letter';
      } else if (!/[A-Z]/.test(password)) {
        errors.password = 'Password must contain at least one uppercase letter';
      } else if (!/[0-9]/.test(password)) {
        errors.password = 'Password must contain at least one number';
      } else if (!/[^a-zA-Z0-9]/.test(password)) {
        errors.password = 'Password must contain at least one special character';
      }
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'An error occurred during signup');
        return;
      }

      // Success!
      setSuccess(true);
      setTimeout(() => {
        router.push('/auth/verify-email?email=' + encodeURIComponent(email));
      }, 2000);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="backdrop-blur-lg bg-white/90 dark:bg-slate-900/90 border-0 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-4">
              <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-green-600 dark:text-green-400">
            Account Created!
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Please check your email to verify your account
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="backdrop-blur-lg bg-white/90 dark:bg-slate-900/90 border-0 shadow-2xl hover:shadow-blue-500/10 transition-shadow duration-300">
      <CardHeader className="space-y-2 text-center pb-8">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Create Your Account
        </CardTitle>
        <CardDescription className="text-base text-gray-600 dark:text-gray-400">
          Start managing your finances today
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              disabled={isLoading}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {fieldErrors.name && (
              <p className="text-sm text-destructive">{fieldErrors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {fieldErrors.email && (
              <p className="text-sm text-destructive">{fieldErrors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a strong password"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {fieldErrors.password && (
              <p className="text-sm text-destructive">{fieldErrors.password}</p>
            )}

            {/* Password strength indicators */}
            {password && (
              <div className="space-y-2 text-xs mt-2">
                <div className="flex gap-1">
                  <div className={`h-1 flex-1 rounded-full transition-colors ${
                    password.length >= 8 ? 'bg-red-500' : 'bg-gray-200'
                  }`} />
                  <div className={`h-1 flex-1 rounded-full transition-colors ${
                    Object.values(passwordChecks).filter(Boolean).length >= 3 ? 'bg-yellow-500' : 'bg-gray-200'
                  }`} />
                  <div className={`h-1 flex-1 rounded-full transition-colors ${
                    Object.values(passwordChecks).filter(Boolean).length === 5 ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                </div>
                <p className="font-medium text-gray-700 dark:text-gray-300">
                  Strength: {Object.values(passwordChecks).filter(Boolean).length < 3 ? 'Weak' :
                            Object.values(passwordChecks).filter(Boolean).length < 5 ? 'Medium' : 'Strong'}
                </p>
                <ul className="space-y-1">
                  <li className={passwordChecks.length ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}>
                    ✓ At least 8 characters
                  </li>
                  <li className={passwordChecks.lowercase ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}>
                    ✓ One lowercase letter
                  </li>
                  <li className={passwordChecks.uppercase ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}>
                    ✓ One uppercase letter
                  </li>
                  <li className={passwordChecks.number ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}>
                    ✓ One number
                  </li>
                  <li className={passwordChecks.special ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}>
                    ✓ One special character
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              disabled={isLoading}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {fieldErrors.confirmPassword && (
              <p className="text-sm text-destructive">{fieldErrors.confirmPassword}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-900 px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full h-11 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            disabled={isLoading}
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign up with Google
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 border-t pt-6">
        <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
