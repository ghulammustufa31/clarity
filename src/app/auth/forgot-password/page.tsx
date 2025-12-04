import { ForgotPasswordForm } from '@/src/components/auth/forgot-password-form';

export const metadata = {
  title: 'Forgot Password - Clarity Finance',
  description: 'Reset your Clarity Finance password',
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <ForgotPasswordForm />
    </div>
  );
}
