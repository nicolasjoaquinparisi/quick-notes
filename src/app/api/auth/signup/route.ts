import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const existUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existUser) {
      return NextResponse.json(
        {
          message: "User already exists",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
