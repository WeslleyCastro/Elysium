import { Book } from "@/models/Book";
import { connectToDB } from "@/utils/database";
import { revalidatePath } from "next/cache";

export const POST = async(req: Request) => {
  const rating = 0
  
  const { 
    author, 
    categorie, 
    createdby, 
    description, 
    image,
    number_pages, 
    price, 
    title,
    creator_rating,
} = await req.json()

  try {
    await connectToDB()

    const newBook = new Book({
      creator:
      createdby,
      description, 
      image,
      number_pages, 
      price, 
      title,
      author, 
      categorie,
      creator_rating,
      rating
    })
    
    await newBook.save()

    revalidatePath("api/books")
   
    return new Response(JSON.stringify(newBook), {
      status: 201
    })

  } catch (error) {
    return new Response("Falied to create a new Book", {
      status: 500
    })
  }
}