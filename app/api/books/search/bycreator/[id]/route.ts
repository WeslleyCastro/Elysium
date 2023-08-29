import { Book } from "@/models/Book"
import { connectToDB } from "@/utils/database"

interface requestParams{
  params: {
    id: string
  }
}

export const GET = async(req: Request, params: requestParams) => {
  
  const userId = params.params.id

  try {
    connectToDB()

    const booksByUser = await Book.find({creator: userId})

    if(!booksByUser)
    return new Response("failed to fetch books by user", {
      status: 404
    })

    return new Response(JSON.stringify(booksByUser), {
      status: 200,
    })
  } catch (error) {
    return new Response("failed to fetch books by user", {
      status: 500,
    })
  }
}