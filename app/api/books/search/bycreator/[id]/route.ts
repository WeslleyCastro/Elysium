import { Book } from "@/models/Book"
import { connectToDB } from "@/utils/database"

export const GET = async(req: Request, params: {id: string}) => {
  const { id } = params

  try {
    connectToDB()

    const booksByUser = await Book.find({creator: id})

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