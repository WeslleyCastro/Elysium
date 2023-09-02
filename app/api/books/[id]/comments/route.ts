import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import Comments, { CommentInterface } from "@/models/Comment";
import { Book } from "@/models/Book";

interface Params {
  params: {
    id: string
  }
}

export const GET = async(req: NextRequest, params: Params) => {
  const getParams = params.params.id

  try {
    await connectToDB()

    const getCommentsByBookId = await Comments.find({commentForBook: getParams}).populate("creator")

    if(!getCommentsByBookId){
      return NextResponse.json({message: "Failed to find comments", status: 404})
    }

    return NextResponse.json({getCommentsByBookId, status: 200})
  } catch (error) {
    return NextResponse.json({message: "Failed to find comments", status: 500})
  }
}


export const POST = async(req: NextRequest, params: Params) => {
  const { comment, createdBy, commentRating} = await req.json()
  const getParams = params.params.id

  const response = await fetch(`http://localhost:3000/api/books/${getParams}`)
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
    
    const newComment = new Comments({
      creator: createdBy,
      commentForBook: getParams,
      createdAt,
      comment,
      commentRating
    })

    const updateRating = await Book.findByIdAndUpdate(getParams, {rating: totalRating.toFixed(1)})

    await newComment.save()

    return NextResponse.json({newComment, updateRating})

  } catch (error) {
    console.log(error)
    return new Response("Failed to find book", {status: 404})
  }
}