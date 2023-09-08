import { connectToDB } from "@/utils/database";
import { Book } from "@/models/Book";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB()

    const getBooks = await Book.find({})

    if(!getBooks) return NextResponse.json({ message: "No books found" }, { status: 404 })

    return NextResponse.json(getBooks)
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}