// Seed script to create initial admin user
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load environment variables manually
const MONGODB_URI = 'mongodb+srv://naayush448:eYmHTdTr9Dne8nVD@cluster0.co5dpst.mongodb.net/career_secure_db?retryWrites=true&w=majority&appName=Cluster0';

const UserSchema = new mongoose.Schema({
  email: String,
  phoneNumber: String,
  password: String,
  agreeToTerms: Boolean,
  isRecruiter: Boolean,
  isVerified: Boolean,
  cinPanGst: String,
  companyEmail: String,
  officeEmail: String,
  remarks: String,
  favouriteCourses: [String],
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const adminUser = new User({
      email: 'admin@example.com',
      phoneNumber: '1234567890',
      password: hashedPassword,
      agreeToTerms: true,
      isRecruiter: true,
      isVerified: true,
      cinPanGst: 'ADMIN001',
      companyEmail: 'admin@company.com',
      officeEmail: 'admin@office.com',
      remarks: 'System administrator account',
      favouriteCourses: ['Full Stack Development', 'Data Science']
    });

    await adminUser.save();
    console.log('Admin user created successfully');

    // Create sample users
    const sampleUsers = [
      {
        email: 'john.doe@example.com',
        phoneNumber: '9876543210',
        password: await bcrypt.hash('password123', 10),
        agreeToTerms: true,
        isRecruiter: false,
        isVerified: true,
        cinPanGst: '',
        companyEmail: '',
        officeEmail: '',
        remarks: 'Sample user account',
        favouriteCourses: ['JavaScript', 'React']
      },
      {
        email: 'jane.smith@example.com',
        phoneNumber: '8765432109',
        password: await bcrypt.hash('password123', 10),
        agreeToTerms: true,
        isRecruiter: true,
        isVerified: false,
        cinPanGst: 'COMP001',
        companyEmail: 'jane@techcorp.com',
        officeEmail: 'jane@office.com',
        remarks: 'Recruiter from TechCorp',
        favouriteCourses: ['Python', 'AI/ML']
      }
    ];

    for (const userData of sampleUsers) {
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        await User.create(userData);
        console.log(`Created user: ${userData.email}`);
      }
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
