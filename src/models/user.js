import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    mobileno: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, 'Please provide a valid 10-digit mobile number'],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    aadharno: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{12}$/, 'Please provide a valid 12-digit Aadhar number'],
    },
    isVerified: { 
      type: Boolean,
      default: false,
    },
    connectionData: {
      type: Object,
    },
    verificationToken: String,
    verificationExpires: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);


// Ensure the model is defined only once
let User;

try {
  // Check if the model is already registered in mongoose.models
  if (mongoose.models && mongoose.models.User) {
    User = mongoose.models.User;
  } else {
    // Register the model if not already defined
    User = mongoose.model('User', userSchema);
  }
} catch (error) {
  console.error("Error while checking or defining User model: ", error);
  throw error;
}

export default User;
