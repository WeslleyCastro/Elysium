import { Book } from "@/models/Book"
import { connectToDB } from "@/utils/database"
import { NextResponse } from "next/server"

interface Params {
  params: {
    id: string
  }
}

export default async function GET(req, {params}: Params) {
  

  try {
    connectToDB()

    const getBookByid = Book.findById(params.id)
    
    if(!getBookByid){
      return new Response("Failed to find book", {status: 404})
    }
    
    return NextResponse.json(getBookByid)
  } catch (error) {
    console.log(error)
    return new Response("Failed to find book", {status: 404})
  }
}