import { Suspense } from 'react';
import { ResetPasswordForm } from '@/src/components/auth/reset-password-form';

export const metadata = {
  title: 'Reset Password - Clarity Finance',
  description: 'Create a new password for your account',
};

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
