import { testConnection } from '../lib/db';
import { db } from '../lib/db';
import { users } from '../lib/db/schema';

export default async function Home() {
  const dbConnected = await testConnection();
  
  let userCount = 0;
  try {
    const result = await db.select().from(users);
    userCount = result.length;
  } catch (error) {
    console.error('Error querying users:', error);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Clarity Finance</h1>
        <p className="text-xl text-muted-foreground">AI-Powered Financial Advisor</p>
        
        <div className="mt-8 p-6 border rounded-lg space-y-2">
          <p className="text-sm font-medium">System Status:</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm">Database:</span>
            <span className={dbConnected ? 'text-green-500' : 'text-red-500'}>
              {dbConnected ? '✓ Connected' : '✗ Not Connected'}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Users in database: {userCount}
          </p>
        </div>
      </div>
    </main>
  );
}