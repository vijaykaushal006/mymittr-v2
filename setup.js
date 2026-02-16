#!/usr/bin/env node

/**
 * Quick Setup Script for MyMittr Social Platform
 * 
 * This script helps you set up the database and storage for the social platform.
 * Run with: node setup.js
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 MyMittr Social Platform Setup\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
    console.error('❌ Error: .env.local file not found!');
    console.log('Please create a .env.local file with your Supabase credentials.');
    process.exit(1);
}

console.log('✅ Environment file found\n');

// Read migration files
const schemaPath = path.join(__dirname, 'supabase', 'migrations', 'enhanced_social_schema.sql');
const storagePath = path.join(__dirname, 'supabase', 'migrations', 'storage_setup.sql');

if (!fs.existsSync(schemaPath)) {
    console.error('❌ Error: enhanced_social_schema.sql not found!');
    process.exit(1);
}

if (!fs.existsSync(storagePath)) {
    console.error('❌ Error: storage_setup.sql not found!');
    process.exit(1);
}

console.log('✅ Migration files found\n');

console.log('📋 Next Steps:\n');
console.log('1. Go to your Supabase Dashboard:');
console.log('   https://gcimtxgtzudsaopxdctu.supabase.co\n');

console.log('2. Navigate to SQL Editor\n');

console.log('3. Run the database schema migration:');
console.log('   - Copy contents from: supabase/migrations/enhanced_social_schema.sql');
console.log('   - Paste in SQL Editor and click "Run"\n');

console.log('4. Run the storage setup:');
console.log('   - Copy contents from: supabase/migrations/storage_setup.sql');
console.log('   - Paste in SQL Editor and click "Run"\n');

console.log('5. Regenerate TypeScript types:');
console.log('   npx supabase gen types typescript --project-id gcimtxgtzudsaopxdctu > types/supabase.ts\n');

console.log('6. Start the development server:');
console.log('   npm run dev\n');

console.log('📖 For detailed instructions, see DATABASE_SETUP.md\n');

console.log('✨ Setup guide complete! Follow the steps above to finish setup.\n');
