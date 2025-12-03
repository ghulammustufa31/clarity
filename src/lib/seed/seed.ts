import { seedCategories } from './categories';

async function seed() {
  console.log('🌱 Starting database seed...');
  
  // Verify DATABASE_URL is loaded
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is not set in .env.local');
    process.exit(1);
  }
  
  console.log('✅ Environment variables loaded');
  
  try {
    await seedCategories();
    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();