import { Book} from "@/models/Book"
import { connectToDB } from "@/utils/database"
import { NextResponse } from "next/server"
import CommentModel, { CommentInterface } from "@/models/Comment"

interface Params {
  params: {
    id: string
  }
}

export async function GET(req: Request, {params}: Params) {
  
  try {
    connectToDB()

    const getBookByid = await Book.findById(params.id).populate("creator")
    const getCommentsByBookId = await CommentModel.find({commentForBook: params.id}).populate("creator")
    
    if(!getBookByid){
      return new Response("Failed to find book", {status: 404})
    }
    
    return NextResponse.json({getBookByid, getCommentsByBookId})
  } catch (error) {
    console.log(error)
    return new Response("Failed to find book", {status: 404})
  }
}

export async function POST(req: Request, {params}: Params) {
  const { comment, createdBy, commentRating} = await req.json()

  const response = await fetch(`http://localhost:3000/api/books/${params.id}`)
  const { getBookByid, getCommentsByBookId } = await response.json()
 
  const commentRatingCount = getCommentsByBookId.reduce((acc: number, comment: CommentInterface) => acc + comment.commentRating, 0)

  let totalRating

  if(commentRatingCount == 0){
    totalRating = getBookByid.creator_rating + commentRating / 2
  }else{
    totalRating = (commentRatingCount + commentRating) / (getCommentsByBookId.length + 2)
  }

  if(totalRating > 5){
    totalRating = 5
  }

  const createdAt = new Date().toISOString()

  try {
    connectToDB()
    
    const newComment = new CommentModel({
      creator: createdBy,
      commentForBook: params.id,
      createdAt,
      comment,
      commentRating
    })

    const updateRating = await Book.findByIdAndUpdate(params.id, {rating: totalRating.toFixed(1)})

    await newComment.save()

    return NextResponse.json({newComment, updateRating})

  } catch (error) {
    console.log(error)
    return new Response("Failed to find book", {status: 404})
  }
}