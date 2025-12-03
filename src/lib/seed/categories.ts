import { db } from '../db/index';
import { categories } from '../db/schema';

export const defaultCategories = [
  // Income categories
  { name: 'Salary', type: 'income' as const, icon: '💰', color: '#10b981', isSystem: true },
  { name: 'Freelance', type: 'income' as const, icon: '💼', color: '#3b82f6', isSystem: true },
  { name: 'Investment', type: 'income' as const, icon: '📈', color: '#8b5cf6', isSystem: true },
  { name: 'Other Income', type: 'income' as const, icon: '💵', color: '#06b6d4', isSystem: true },
  
  // Expense categories
  { name: 'Housing', type: 'expense' as const, icon: '🏠', color: '#ef4444', isSystem: true },
  { name: 'Transportation', type: 'expense' as const, icon: '🚗', color: '#f59e0b', isSystem: true },
  { name: 'Food & Dining', type: 'expense' as const, icon: '🍔', color: '#ec4899', isSystem: true },
  { name: 'Groceries', type: 'expense' as const, icon: '🛒', color: '#84cc16', isSystem: true },
  { name: 'Shopping', type: 'expense' as const, icon: '🛍️', color: '#a855f7', isSystem: true },
  { name: 'Entertainment', type: 'expense' as const, icon: '🎬', color: '#14b8a6', isSystem: true },
  { name: 'Healthcare', type: 'expense' as const, icon: '⚕️', color: '#f43f5e', isSystem: true },
  { name: 'Utilities', type: 'expense' as const, icon: '⚡', color: '#eab308', isSystem: true },
  { name: 'Insurance', type: 'expense' as const, icon: '🛡️', color: '#6366f1', isSystem: true },
  { name: 'Education', type: 'expense' as const, icon: '📚', color: '#0ea5e9', isSystem: true },
  { name: 'Personal Care', type: 'expense' as const, icon: '💅', color: '#d946ef', isSystem: true },
  { name: 'Subscriptions', type: 'expense' as const, icon: '📱', color: '#64748b', isSystem: true },
  { name: 'Other Expense', type: 'expense' as const, icon: '📝', color: '#94a3b8', isSystem: true },
];

export async function seedCategories() {
  console.log('🌱 Seeding categories...');
  
  try {
    await db.insert(categories).values(defaultCategories);
    console.log('✅ Categories seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding categories:', error);
    throw error;
  }
}