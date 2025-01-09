import dbConnect from '@/utils/db'; // Adjust the path to your dbConnect file
import User from '@/models/user'; // Adjust the path to your User model
import bcrypt from 'bcrypt';
import { sendEmail } from '@/utils/sendEmail'; // Import your email utility
import crypto from 'crypto';

export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();
    const { name, email, mobileno, password, aadharno, captchaToken, captchaInput } = body;

    // Connect to the database
    await dbConnect();

    // Validate input fields
    if (!name || !email || !mobileno || !password || !aadharno || !captchaToken || !captchaInput) {
      return new Response(
        JSON.stringify({ message: 'All fields are required', success: false }),
        { status: 400 }
      );
    }

    // Step 1: Verify CAPTCHA
    global.captchaStore = global.captchaStore || {}; // Initialize CAPTCHA store
    const storedCaptcha = global.captchaStore[captchaToken];

    if (!storedCaptcha || storedCaptcha !== captchaInput) {
      return new Response(
        JSON.stringify({ message: 'Invalid CAPTCHA', success: false }),
        { status: 400 }
      );
    }

    // Step 2: Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: 'User already exists with this email', success: false }),
        { status: 400 }
      );
    }

    // Step 3: Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 4: Generate a verification token and expiry time
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = Date.now() + 60 * 60 * 1000; // Token valid for 1 hour

    // Step 5: Create a new user (initially unverified)
    const user = await User.create({
      name,
      email,
      mobileno,
      password: hashedPassword,
      aadharno,
      isVerified: false, // Add an `isVerified` field in your User model
      verificationToken,
      verificationExpires,
    });

    // Step 6: Send the verification email
    const verificationLink = `${process.env.FRONTEND_URL}/auth/verify-email?token=${verificationToken}&email=${email}`;
    await sendEmail({
      to: email,
      subject: 'Email Verification',
      text: `Hello ${name},\n\nPlease verify your email by clicking the link below:\n${verificationLink}`,
      html: `<p>Hello ${name},</p>
             <p>Please verify your email by clicking the link below:</p>
             <a href="${verificationLink}">Verify Email</a>`,
    });

    // Step 7: Return success response
    return new Response(
      JSON.stringify({
        message: 'User created successfully. Please check your email to verify your account.',
        userId: user._id,
        success: true
      }),
      { status: 201 }
    );

  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: 'Server error', error: error.message, success: false }),
      { status: 500 }
    );
  } 
}
