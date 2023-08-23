import { Book } from "@/models/Book"
import { connectToDB } from "@/utils/database"


export async function GET(req: Request, res: Response,){
  const filter: string = req.nextUrl.searchParams.get("user")

  try {
    connectToDB()

    const bookCreator = await Book.find({ creator: filter}).populate("creator")

    if(!bookCreator) return new Response("no books found", { 
      status: 404 
    })

    return new Response(JSON.stringify(bookCreator), {status: 200})
  } catch (error) {
    return new Response(JSON.stringify("failed to get book user"), {
      status: 500
    })
  }
}