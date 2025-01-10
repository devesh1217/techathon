import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.split(' ')[1]; // Assuming 'Bearer <token>' format

  if (!token) {
    return NextResponse.json(
      { message: 'Unauthorized', success: false },
      { status: 401 }
    );
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET); // Fetch user details from the token
    if (!user) {
      return NextResponse.json(
        { message: 'User not found', success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return NextResponse.json(
      { message: 'Unauthorized', success: false },
      { status: 401 }
    );
  }
}
