import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  gradient: string;
}

export function StatsCard({ title, value, icon: Icon, trend, trendUp, gradient }: StatsCardProps) {
  return (
    <Card className={`backdrop-blur-sm bg-gradient-to-br ${gradient} border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {title}
        </CardTitle>
        <div className="h-10 w-10 rounded-full bg-white/80 dark:bg-slate-900/80 flex items-center justify-center">
          <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-900 dark:text-white">
          {value}
        </div>
        {trend && (
          <p className={`text-xs mt-1 ${
            trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {trendUp ? '↑' : '↓'} {trend}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
