// Quick database test script
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection string
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

async function testDatabaseAndCreateUser() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully!');

    // Check existing users
    const existingUsers = await User.find({});
    console.log(`Found ${existingUsers.length} existing users in database`);
    
    if (existingUsers.length > 0) {
      console.log('Existing users:');
      existingUsers.forEach(user => {
        console.log(`- ${user.email} (Created: ${user.createdAt})`);
      });
    }

    // Create admin user if doesn't exist
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      console.log('Creating admin user...');
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
      console.log('✅ Admin user created successfully!');
    } else {
      console.log('✅ Admin user already exists');
    }

    // Create test user if doesn't exist
    const testExists = await User.findOne({ email: 'test@example.com' });
    if (!testExists) {
      console.log('Creating test user...');
      const hashedPassword = await bcrypt.hash('test123', 10);
      
      const testUser = new User({
        email: 'test@example.com',
        phoneNumber: '9876543210',
        password: hashedPassword,
        agreeToTerms: true,
        isRecruiter: false,
        isVerified: true,
        cinPanGst: '',
        companyEmail: '',
        officeEmail: '',
        remarks: 'Test user account',
        favouriteCourses: ['JavaScript', 'React']
      });

      await testUser.save();
      console.log('✅ Test user created successfully!');
    } else {
      console.log('✅ Test user already exists');
    }

    console.log('\n🎉 Database setup complete!');
    console.log('\n📝 You can now login with:');
    console.log('Email: admin@example.com');
    console.log('Password: password123');
    console.log('\nOR');
    console.log('Email: test@example.com');
    console.log('Password: test123');

  } catch (error) {
    console.error('❌ Database error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

testDatabaseAndCreateUser();
