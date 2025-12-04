import { auth } from '@/src/lib/auth/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/login');
  }

  if (!session.user.emailVerified) {
    redirect('/auth/verify-email');
  }

  return <>{children}</>;
}
