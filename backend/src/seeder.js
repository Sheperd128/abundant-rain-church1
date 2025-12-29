// backend/src/seeder.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

// Sample Data
const users = [
  {
    name: 'Pastor Ernest Umanuah',
    email: 'pastor@abundantrain.com',
    password: 'password123', 
    role: 'superadmin',
    ministry: 'General',
    phone: '0000000000'
  },
  {
    name: 'Tebogo Umanah',
    email: 'women@abundantrain.com',
    password: 'password123',
    role: 'ministry_leader',
    ministry: 'Women',
    phone: '0761441433'
  },
  {
    name: 'Mr Mboyana',
    email: 'men@abundantrain.com',
    password: 'password123',
    role: 'ministry_leader',
    ministry: 'Men',
    phone: '0789432872'
  },
  {
    name: 'Mr Nkutha',
    email: 'youth@abundantrain.com',
    password: 'password123',
    role: 'ministry_leader',
    ministry: 'Youth',
    phone: '0799741408'
  },
  {
    name: 'Sunday School Leader',
    email: 'children@abundantrain.com',
    password: 'password123',
    role: 'ministry_leader',
    ministry: 'Children',
    phone: '' 
  }
];

const importData = async () => {
  try {
    await connectDB();

    // 1. CLEAR existing users
    await User.deleteMany();
    console.log('🗑️  Old users removed...');

    // 2. Insert new users ONE BY ONE (triggers encryption)
    for (const user of users) {
      await User.create(user);
    }

    console.log('✅ Data Imported Successfully with Encryption!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();