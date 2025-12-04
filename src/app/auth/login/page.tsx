import { Suspense } from 'react';
import { LoginForm } from '@/src/components/auth/login-form';

export const metadata = {
  title: 'Sign In - Clarity Finance',
  description: 'Sign in to your Clarity Finance account',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
