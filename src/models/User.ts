import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the interface for User document
export interface IUser extends Document {
  _id: string;
  email: string;
  phoneNumber: string;
  password: string;
  agreeToTerms: boolean;
  isRecruiter: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  cinPanGst?: string;
  companyEmail?: string;
  officeEmail?: string;
  remarks?: string;
  favouriteCourses?: string[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Create the schema
const UserSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  agreeToTerms: {
    type: Boolean,
    required: true,
    default: false,
  },
  isRecruiter: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  cinPanGst: {
    type: String,
    default: '',
  },
  companyEmail: {
    type: String,
    default: '',
  },
  officeEmail: {
    type: String,
    default: '',
  },
  remarks: {
    type: String,
    default: '',
  },
  favouriteCourses: [{
    type: String,
  }],
}, {
  timestamps: true,
});

// Hash password before saving
UserSchema.pre<IUser>('save', async function(next: any) {
  // @ts-ignore
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    // @ts-ignore
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
