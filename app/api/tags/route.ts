import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Tag from "@/app/Models/TagSchema";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

export async function POST(req: Request) {
  try {
    await mongoose.connect(MONGODB_URI);
    const { name } = await req.json();

    const tag = await Tag.create({
      name,
      userId: "demo-user",
    });

    return NextResponse.json({ tag });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await mongoose.connect(MONGODB_URI);
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || "demo-user";

    const tags = await Tag.find({ userId });

    return NextResponse.json({ tags });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await mongoose.connect(MONGODB_URI);
    const { name, _id } = await req.json();

    if (!_id) {
      return NextResponse.json({ error: "Tag ID is required" }, { status: 400 });
    }

    const tag = await Tag.findByIdAndUpdate(
      _id,
      {
        name,
        userId: "demo-user",
      },
      { new: true }
    );

    return NextResponse.json({ tag });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await mongoose.connect(MONGODB_URI);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Tag ID is required" }, { status: 400 });
    }

    await Tag.findByIdAndDelete(id);

    return NextResponse.json({ message: "Tag deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
