import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    // Verify authentication
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized - Please login" },
        { status: 401 }
      );
    }

    // Verify and decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    
    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        { error: "Invalid session" },
        { status: 401 }
      );
    }

    // Get request body
    const { currentPassword, newPassword } = await request.json();

    // Validate inputs
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current password and new password are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        password: true,
        isAdmin: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Check if new password is same as current
    const isSamePassword = await bcrypt.compare(newPassword, user.password);

    if (isSamePassword) {
      return NextResponse.json(
        { error: "New password must be different from current password" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in database
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    console.log(`✅ Password changed successfully for user: ${user.email}`);

    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {
    console.error("❌ Error changing password:", error);

    // Handle JWT errors
    if (error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { error: "Invalid session - Please login again" },
        { status: 401 }
      );
    }

    if (error.name === "TokenExpiredError") {
      return NextResponse.json(
        { error: "Session expired - Please login again" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Failed to change password. Please try again." },
      { status: 500 }
    );
  }
}











