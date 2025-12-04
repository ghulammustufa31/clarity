import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface Insight {
  text: string;
  type: 'info' | 'success' | 'warning';
}

const insights: Insight[] = [
  { text: 'You spent 30% more on dining this month', type: 'warning' },
  { text: 'Great job! You\'re under budget in entertainment', type: 'success' },
  { text: 'Consider setting aside $500 for savings', type: 'info' },
];

export function AIInsights() {
  return (
    <Card className="backdrop-blur-sm bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              AI Insights
            </CardTitle>
            <CardDescription className="text-xs">Powered by AI analysis</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-start gap-2">
            <span className={`inline-block w-2 h-2 rounded-full mt-1.5 ${
              insight.type === 'success' ? 'bg-green-500' :
              insight.type === 'warning' ? 'bg-amber-500' :
              'bg-blue-500'
            }`} />
            <p className="text-sm text-gray-700 dark:text-gray-300">{insight.text}</p>
          </div>
        ))}
        <Button variant="outline" className="w-full mt-4" size="sm">
          <Sparkles className="h-4 w-4 mr-2" />
          Generate New Insights
        </Button>
      </CardContent>
    </Card>
  );
}
