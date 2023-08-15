import { connectToDB } from "@/utils/database";
import { Book } from "@/models/Book";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    connectToDB()

    const getBooks = await Book.find({})

    return NextResponse.json(getBooks)

  } catch (error) {
    return new Response("failed to fetch all books", {
      status: 500
    })
  }
}