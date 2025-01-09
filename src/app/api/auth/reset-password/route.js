import dbConnect from '@/utils/db';
import User from '@/models/user';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const { token, email, password } = await req.json();

    // Connect to the database
    await dbConnect();

    // Validate input
    if (!token || !email || !password) {
      return new Response(
        JSON.stringify({ message: 'Token, email, and new password are required', success: false }),
        { status: 400 }
      );
    }

    // Find the user with the provided email and token
    const user = await User.findOne({
      email,
      verificationToken: token,
      verificationExpires: { $gt: Date.now() }, // Ensure token is not expired
    });

    if (!user) {
      return new Response(
        JSON.stringify({ message: 'Invalid or expired token', success: false }),
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password and clear the token
    user.password = hashedPassword;
    user.verificationToken = null;
    user.verificationExpires = null;
    await user.save();

    return new Response(
      JSON.stringify({ message: 'Password reset successfully', success: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: 'Server error', error: error.message, success: false }),
      { status: 500 }
    );
  }
}
