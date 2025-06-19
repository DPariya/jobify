import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'please provide name'],
    },
    email: {
      type: String,
      required: [true, 'please provide email'],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'please provide password'],
      minLength: 6,
    },
  },
  { timestamps: true }
);

//Hash Password before save
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    // Optional: log it or customize the error
    console.error('Error hashing password:', err);
    throw new Error('Password encryption failed. Please try again.');
  }
});

//compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    // Optional: log it for debugging
    logger?.error('Password comparison failed', err);
    // Throw a custom or generic error
    throw new Error('Password encryption failed. Please try again.');
    //::TODO
    // throw new CustomError('Password comparison failed. Please try again.', 500);
  }
};

const User = mongoose.model('User', userSchema);
export default User;
