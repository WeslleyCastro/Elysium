import { Book } from "@/models/Book"
import { connectToDB } from "@/utils/database"
import { NextRequest } from "next/server"

export const GET = async(req: NextRequest ) => {
  const filter: string | null = req.nextUrl.searchParams.get("q")

  try {
    connectToDB()
    const books = await Book.find({ title: { $regex: filter, $options: "i" } })

    if(!books) return new Response("no books found", { status: 404 })

    return new Response(JSON.stringify(books), {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return new Response("failed to fetch all books", {
      status:500
   })
   }
 }