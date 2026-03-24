// Seed Database Script
// Usage: npm run seed OR npm run seed:clear

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Employee, User } from '../models/index.js';

// Load environment variables
dotenv.config();

const shouldClear = process.argv.includes('--clear');

// Indian-style Employee Data
const employeesData = [
  {
    name: 'Rajesh Kumar Sharma',
    email: 'rajesh.sharma@company.com',
    phone: '+91-9876543210',
    department: 'Engineering',
    role: 'Senior Software Engineer',
    joiningDate: '2020-01-15',
    salary: 1200000,
    status: 'active',
    address: '42, Nehru Nagar, Andheri East, Mumbai, Maharashtra 400069'
  },
  {
    name: 'Priya Patel',
    email: 'priya.patel@company.com',
    phone: '+91-9876543211',
    department: 'Marketing',
    role: 'Marketing Manager',
    joiningDate: '2019-03-20',
    salary: 950000,
    status: 'active',
    address: '15, Satellite Road, Ahmedabad, Gujarat 380015'
  },
  {
    name: 'Amit Singh Chauhan',
    email: 'amit.chauhan@company.com',
    phone: '+91-9876543212',
    department: 'Engineering',
    role: 'Frontend Developer',
    joiningDate: '2021-06-10',
    salary: 800000,
    status: 'active',
    address: '78, Rajouri Garden, New Delhi 110027'
  },
  {
    name: 'Sneha Reddy',
    email: 'sneha.reddy@company.com',
    phone: '+91-9876543213',
    department: 'HR',
    role: 'HR Manager',
    joiningDate: '2018-09-05',
    salary: 900000,
    status: 'active',
    address: '23, Banjara Hills, Hyderabad, Telangana 500034'
  },
  {
    name: 'Vikram Malhotra',
    email: 'vikram.malhotra@company.com',
    phone: '+91-9876543214',
    department: 'Sales',
    role: 'Sales Executive',
    joiningDate: '2020-11-12',
    salary: 700000,
    status: 'active',
    address: '56, Sector 18, Noida, Uttar Pradesh 201301'
  },
  {
    name: 'Ananya Iyer',
    email: 'ananya.iyer@company.com',
    phone: '+91-9876543215',
    department: 'Engineering',
    role: 'Backend Developer',
    joiningDate: '2021-02-18',
    salary: 850000,
    status: 'inactive',
    address: '89, Koramangala, Bangalore, Karnataka 560034'
  },
  {
    name: 'Rohit Mehta',
    email: 'rohit.mehta@company.com',
    phone: '+91-9876543216',
    department: 'Finance',
    role: 'Financial Analyst',
    joiningDate: '2019-07-22',
    salary: 780000,
    status: 'active',
    address: '34, Viman Nagar, Pune, Maharashtra 411014'
  },
  {
    name: 'Kavitha Nair',
    email: 'kavitha.nair@company.com',
    phone: '+91-9876543217',
    department: 'Marketing',
    role: 'Content Writer',
    joiningDate: '2022-01-30',
    salary: 550000,
    status: 'active',
    address: '12, MG Road, Kochi, Kerala 682016'
  },
  {
    name: 'Sanjay Gupta',
    email: 'sanjay.gupta@company.com',
    phone: '+91-9876543218',
    department: 'Engineering',
    role: 'DevOps Engineer',
    joiningDate: '2020-05-14',
    salary: 1100000,
    status: 'active',
    address: '67, Salt Lake, Kolkata, West Bengal 700091'
  },
  {
    name: 'Pooja Verma',
    email: 'pooja.verma@company.com',
    phone: '+91-9876543219',
    department: 'Design',
    role: 'UI/UX Designer',
    joiningDate: '2021-08-25',
    salary: 750000,
    status: 'active',
    address: '45, Anna Nagar, Chennai, Tamil Nadu 600040'
  },
  {
    name: 'Arjun Deshmukh',
    email: 'arjun.deshmukh@company.com',
    phone: '+91-9876543220',
    department: 'Sales',
    role: 'Sales Manager',
    joiningDate: '2018-04-08',
    salary: 1050000,
    status: 'active',
    address: '28, FC Road, Pune, Maharashtra 411005'
  },
  {
    name: 'Divya Joshi',
    email: 'divya.joshi@company.com',
    phone: '+91-9876543221',
    department: 'HR',
    role: 'Recruitment Specialist',
    joiningDate: '2020-09-19',
    salary: 620000,
    status: 'inactive',
    address: '91, Civil Lines, Jaipur, Rajasthan 302006'
  },
  {
    name: 'Karthik Rajan',
    email: 'karthik.rajan@company.com',
    phone: '+91-9876543222',
    department: 'Engineering',
    role: 'Full Stack Developer',
    joiningDate: '2021-03-11',
    salary: 950000,
    status: 'active',
    address: '17, Adyar, Chennai, Tamil Nadu 600020'
  },
  {
    name: 'Neha Kapoor',
    email: 'neha.kapoor@company.com',
    phone: '+91-9876543223',
    department: 'Finance',
    role: 'Accountant',
    joiningDate: '2019-10-27',
    salary: 680000,
    status: 'active',
    address: '63, Model Town, Ludhiana, Punjab 141002'
  },
  {
    name: 'Suresh Pillai',
    email: 'suresh.pillai@company.com',
    phone: '+91-9876543224',
    department: 'Operations',
    role: 'Operations Manager',
    joiningDate: '2017-12-03',
    salary: 1000000,
    status: 'active',
    address: '38, Panampilly Nagar, Kochi, Kerala 682036'
  },
  {
    name: 'Meera Saxena',
    email: 'meera.saxena@company.com',
    phone: '+91-9876543225',
    department: 'Marketing',
    role: 'Social Media Manager',
    joiningDate: '2021-05-16',
    salary: 600000,
    status: 'active',
    address: '52, Gomti Nagar, Lucknow, Uttar Pradesh 226010'
  },
  {
    name: 'Aditya Rao',
    email: 'aditya.rao@company.com',
    phone: '+91-9876543226',
    department: 'Engineering',
    role: 'QA Engineer',
    joiningDate: '2020-08-09',
    salary: 720000,
    status: 'active',
    address: '74, Jayanagar, Bangalore, Karnataka 560041'
  },
  {
    name: 'Swati Agarwal',
    email: 'swati.agarwal@company.com',
    phone: '+91-9876543227',
    department: 'Design',
    role: 'Graphic Designer',
    joiningDate: '2022-02-28',
    salary: 580000,
    status: 'inactive',
    address: '19, Hazratganj, Lucknow, Uttar Pradesh 226001'
  },
  {
    name: 'Manish Tiwari',
    email: 'manish.tiwari@company.com',
    phone: '+91-9876543228',
    department: 'Sales',
    role: 'Business Development',
    joiningDate: '2019-11-21',
    salary: 820000,
    status: 'active',
    address: '86, Ashok Nagar, Bhopal, Madhya Pradesh 462023'
  },
  {
    name: 'Lakshmi Menon',
    email: 'lakshmi.menon@company.com',
    phone: '+91-9876543229',
    department: 'Operations',
    role: 'Project Manager',
    joiningDate: '2020-04-07',
    salary: 980000,
    status: 'active',
    address: '31, Thiruvanmiyur, Chennai, Tamil Nadu 600041'
  },
  {
    name: 'Deepak Bhatt',
    email: 'deepak.bhatt@company.com',
    phone: '+91-9876543230',
    department: 'Engineering',
    role: 'Software Architect',
    joiningDate: '2017-06-14',
    salary: 1500000,
    status: 'active',
    address: '47, Indiranagar, Bangalore, Karnataka 560038'
  },
  {
    name: 'Ritu Bansal',
    email: 'ritu.bansal@company.com',
    phone: '+91-9876543231',
    department: 'HR',
    role: 'Training Coordinator',
    joiningDate: '2021-09-03',
    salary: 520000,
    status: 'active',
    address: '25, Sector 14, Gurgaon, Haryana 122001'
  }
];

// Admin User Data
const usersData = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123', // In production, use bcrypt to hash
    role: 'admin',
    status: 'active'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected Successfully!');

    if (shouldClear) {
      console.log('\nClearing existing data...');
      await Employee.deleteMany({});
      await User.deleteMany({});
      console.log('Existing data cleared!');
    }

    // Check existing counts
    const existingEmployees = await Employee.countDocuments();
    const existingUsers = await User.countDocuments();

    if (existingEmployees > 0 || existingUsers > 0) {
      console.log(`\nExisting data found: ${existingEmployees} employees, ${existingUsers} users`);
      console.log('Use --clear flag to reset: npm run seed:clear');
    }

    // Seed Employees
    if (existingEmployees === 0) {
      console.log('\nSeeding employees...');
      await Employee.insertMany(employeesData);
      console.log(`${employeesData.length} employees inserted!`);
    }

    // Seed Users
    if (existingUsers === 0) {
      console.log('\nSeeding users...');
      await User.insertMany(usersData);
      console.log(`${usersData.length} users inserted!`);
    }

    console.log('\n========================================');
    console.log('Database seeded successfully!');
    console.log('========================================');
    console.log('\nLogin Credentials:');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    console.log('========================================');

    process.exit(0);
  } catch (error) {
    console.error('Seed Error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
