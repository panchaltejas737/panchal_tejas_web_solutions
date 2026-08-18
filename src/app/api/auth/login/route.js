import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { signToken, AUTH_COOKIE_NAME, cookieOptions } from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password format." },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    await dbConnect();

    const user = await User.findOne({ email: email.toLowerCase() });

    // Generic error message — don't reveal whether email exists (security best practice)
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials." },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials." },
        { status: 401 }
      );
    }

    const token = signToken({ userId: user._id.toString(), email: user.email });

    const response = NextResponse.json(
      { success: true, message: "Login successful.", user: { email: user.email, name: user.name } },
      { status: 200 }
    );

    response.cookies.set(AUTH_COOKIE_NAME, token, cookieOptions);

    return response;
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}