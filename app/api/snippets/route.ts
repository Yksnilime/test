import { NextResponse } from "next/server";
import mongoose from "mongoose";
import SnippetM from "@/app/Models/SnippetSchema";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

export async function POST(req: Request) {
  try {
    await mongoose.connect(MONGODB_URI);
    const { title, description, code, language, tags } = await req.json();

    const note = await SnippetM.create({
      title,
      description,
      code,
      language,
      tags,
      userId: "demo-user",
      creationDate: new Date().toISOString(),
      isFavorite: false,
      isTrash: false,
    });

    return NextResponse.json({ note });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await mongoose.connect(MONGODB_URI);
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || "demo-user";
    const snippetId = searchParams.get("snippetId");

    if (snippetId) {
      const note = await SnippetM.findById(snippetId);
      return NextResponse.json({ note });
    }

    const notes = await SnippetM.find({ userId });

    return NextResponse.json({ notes });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await mongoose.connect(MONGODB_URI);
    const { searchParams } = new URL(req.url);
    const snippetId = searchParams.get("snippetId");

    if (!snippetId) {
      return NextResponse.json({ error: "Snippet ID is required" }, { status: 400 });
    }

    const { title, description, code, language, tags, isFavorite, isTrash } = await req.json();

    const note = await SnippetM.findByIdAndUpdate(
      snippetId,
      {
        title,
        description,
        code,
        language,
        tags,
        isFavorite,
        isTrash,
        userId: "demo-user",
      },
      { new: true }
    );

    return NextResponse.json({ note });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await mongoose.connect(MONGODB_URI);
    const { searchParams } = new URL(req.url);
    const snippetId = searchParams.get("snippetId");

    if (!snippetId) {
      return NextResponse.json({ error: "Snippet ID is required" }, { status: 400 });
    }

    await SnippetM.findByIdAndDelete(snippetId);

    return NextResponse.json({ message: "Snippet deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
