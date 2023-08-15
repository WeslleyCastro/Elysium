import { Book } from "@/models/Book";
import { connectToDB } from "@/utils/database";

export const POST = async(req: Request) => {
  const data = await req.json()

  try {
    await connectToDB()

    const newBook = new Book({
      ...data
    })
    
    await newBook.save()
   
    return new Response(JSON.stringify(newBook), {
      status: 201
    })

  } catch (error) {
    return new Response("Falied to create a new Book", {
      status: 500
    })
  }
}