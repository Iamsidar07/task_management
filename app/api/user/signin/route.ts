import { connectToDB } from "@/dbConfig/connectToDB";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { userSignInSchema } from "@/schemas/user";
import jwt from "jsonwebtoken";

connectToDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const data = userSignInSchema.parse(reqBody);
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }
    const isValidPassword = await bcryptjs.compare(
      data.password,
      user.password
    );
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }
    // token data
    const tokenData = {
      id: user._id,
      // email: user.email,
      // firstName: user.firstName,
      // lastName: user.lastName,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: data.remember ? "30 days" : "7d",
    });
    // set token into cookie
    const response = NextResponse.json({
      message: "Sign in successfully",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}
