import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Budget {
  category: string;
  percentage: number;
  isOver: boolean;
}

const budgets: Budget[] = [
  { category: 'Food', percentage: 80, isOver: false },
  { category: 'Transport', percentage: 60, isOver: false },
  { category: 'Shopping', percentage: 110, isOver: true },
  { category: 'Entertainment', percentage: 45, isOver: false },
];

export function BudgetOverview() {
  return (
    <Card className="backdrop-blur-sm bg-white/60 dark:bg-slate-900/60 border shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Budget Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {budgets.map((budget, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {budget.category}
              </span>
              <span className={`font-semibold ${
                budget.isOver ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'
              }`}>
                {budget.percentage}%
              </span>
            </div>
            <Progress
              value={Math.min(budget.percentage, 100)}
              className="h-2"
              indicatorClassName={budget.isOver ? 'bg-red-500' : budget.percentage > 75 ? 'bg-yellow-500' : 'bg-green-500'}
            />
            {budget.isOver && (
              <p className="text-xs text-red-600 dark:text-red-400">Over budget!</p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
