import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Building, BarChart3, Settings } from 'lucide-react';

const actions = [
  { icon: Plus, label: 'Add Transaction', color: 'from-blue-500 to-blue-600' },
  { icon: Building, label: 'Connect Bank', color: 'from-green-500 to-green-600' },
  { icon: BarChart3, label: 'View Reports', color: 'from-purple-500 to-purple-600' },
  { icon: Settings, label: 'Settings', color: 'from-gray-500 to-gray-600' },
];

export function QuickActions() {
  return (
    <Card className="backdrop-blur-sm bg-white/60 dark:bg-slate-900/60 border shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="h-auto flex-col gap-2 py-4 hover:scale-105 transition-transform"
          >
            <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${action.color} flex items-center justify-center`}>
              <action.icon className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs font-medium">{action.label}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
