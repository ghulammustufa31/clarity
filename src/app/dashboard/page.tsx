import { auth, signOut } from '@/src/lib/auth/auth';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/src/components/dashboard/stats-card';
import { AIInsights } from '@/src/components/dashboard/ai-insights';
import { QuickActions } from '@/src/components/dashboard/quick-actions';
import { TransactionsList } from '@/src/components/dashboard/transactions-list';
import { BudgetOverview } from '@/src/components/dashboard/budget-overview';
import { Wallet, Building2, TrendingDown, CreditCard } from 'lucide-react';

export const metadata = {
  title: 'Dashboard - Clarity Finance',
  description: 'Your financial dashboard',
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/50 to-slate-50 dark:from-slate-900 dark:via-indigo-950/30 dark:to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Clarity
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{session.user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{session.user.email}</p>
              </div>
              <form action={async () => {
                'use server';
                await signOut({ redirectTo: '/auth/login' });
              }}>
                <Button
                  type="submit"
                  variant="outline"
                  size="sm"
                  className="hover:bg-gray-50 dark:hover:bg-slate-800"
                >
                  Sign Out
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {session.user.name?.split(' ')[0]}!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Here&apos;s your financial overview for today
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StatsCard
            title="Total Balance"
            value="$12,450"
            icon={Wallet}
            trend="+2.5%"
            trendUp={true}
            gradient="from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50"
          />
          <StatsCard
            title="Accounts"
            value="3"
            icon={Building2}
            gradient="from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50"
          />
          <StatsCard
            title="This Month"
            value="-$2,340"
            icon={TrendingDown}
            trend="Spent"
            gradient="from-purple-50 to-violet-50 dark:from-purple-950/50 dark:to-violet-950/50"
          />
          <StatsCard
            title="Cards"
            value="2"
            icon={CreditCard}
            gradient="from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50"
          />
        </div>

        {/* AI Insights & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="lg:col-span-2">
            <AIInsights />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>

        {/* Transactions List */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <TransactionsList />
        </div>

        {/* Budget Overview */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <BudgetOverview />
        </div>
      </div>
    </div>
  );
}
