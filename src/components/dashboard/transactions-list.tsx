import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface Transaction {
  id: string;
  icon: string;
  merchant: string;
  date: string;
  amount: number;
}

const transactions: Transaction[] = [
  { id: '1', icon: '🍔', merchant: 'McDonald\'s', date: 'Yesterday', amount: -12.50 },
  { id: '2', icon: '🛒', merchant: 'Walmart', date: 'Dec 2', amount: -85.42 },
  { id: '3', icon: '⛽', merchant: 'Shell Gas Station', date: 'Dec 1', amount: -45.00 },
  { id: '4', icon: '💼', merchant: 'Salary Deposit', date: 'Dec 1', amount: 3500.00 },
  { id: '5', icon: '☕', merchant: 'Starbucks', date: 'Nov 30', amount: -6.75 },
];

export function TransactionsList() {
  return (
    <Card className="backdrop-blur-sm bg-white/60 dark:bg-slate-900/60 border shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Recent Transactions</CardTitle>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{transaction.icon}</div>
                <div>
                  <p className="font-medium text-sm text-gray-900 dark:text-white">
                    {transaction.merchant}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {transaction.date}
                  </p>
                </div>
              </div>
              <p className={`font-semibold ${
                transaction.amount > 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
