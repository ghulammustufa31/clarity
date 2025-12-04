import { SignupForm } from '@/src/components/auth/signup-form';

export const metadata = {
  title: 'Sign Up - Clarity Finance',
  description: 'Create your Clarity Finance account',
};

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SignupForm />
      </div>
    </div>
  );
}
