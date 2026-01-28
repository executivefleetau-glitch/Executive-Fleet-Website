import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findFirst({
      where: { isAdmin: true },
    });

    if (existingAdmin) {
      return NextResponse.json(
        { message: "Admin user already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash("admin@123", saltRounds);

    // Create the admin user
    const adminUser = await prisma.user.create({
      data: {
        email: "executivefleet.au@gmail.com",
        password: hashedPassword,
        name: "Executive Fleet Admin",
        isAdmin: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Admin user created successfully",
        user: {
          id: adminUser.id,
          email: adminUser.email,
          name: adminUser.name,
          isAdmin: adminUser.isAdmin,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Seed admin error:", error);
    return NextResponse.json(
      { error: "Failed to create admin user" },
      { status: 500 }
    );
  }
}


