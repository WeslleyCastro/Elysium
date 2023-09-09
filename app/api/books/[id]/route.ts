import { Book } from "@/models/Book"
import { connectToDB } from "@/utils/database"
import { NextResponse } from "next/server"

interface Params {
  params: {
    id: string
  }
}

export async function GET({ params }: Params) {
  try {
    connectToDB()

    if(params.id.length < 12){
      return NextResponse.json({ status: 404, message: "Book not found" })
    }

    const getBookByid = await Book.findById(params.id).populate("creator")

    if(!getBookByid){
      return NextResponse.json("Book not found", {status: 404})
    }
    
    return NextResponse.json({getBookByid, status: 200})
  } catch (error) {
    console.log(error)
    return new Response("Failed to find book", {status: 505})
  }
}