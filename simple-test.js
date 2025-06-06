console.log('Starting script...');

try {
  const mongoose = require('mongoose');
  console.log('Mongoose loaded');
  
  const bcrypt = require('bcryptjs');
  console.log('Bcrypt loaded');
  
  // Test connection
  const MONGODB_URI = 'mongodb+srv://naayush448:eYmHTdTr9Dne8nVD@cluster0.co5dpst.mongodb.net/career_secure_db?retryWrites=true&w=majority&appName=Cluster0';
  
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('✅ Connected to MongoDB successfully!');
      return mongoose.disconnect();
    })
    .then(() => {
      console.log('Disconnected');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Connection error:', error.message);
      process.exit(1);
    });
    
} catch (error) {
  console.error('❌ Script error:', error.message);
  process.exit(1);
}
