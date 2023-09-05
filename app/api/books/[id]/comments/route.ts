import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import Comments, { CommentInterface } from "@/models/Comment";
import { Book, BookInterface } from "@/models/Book";

interface Params {
  params: {
    id: string
  }
}

interface CommentsData {
  getCommentsByBookId: CommentInterface[]
}

interface BookData {
  getBookByid: BookInterface
}

export const GET = async(req: NextRequest, params: Params) => {
  const getParams = params.params.id

  try {
    await connectToDB()

    const getCommentsByBookId: CommentInterface[] = await Comments.find({commentForBook: getParams}).populate("creator")

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
  const getParams = params.params.id   // Book id


  const getCommentsData = await fetch(`http://localhost:3000/api/books/${getParams}/comments`)
  const { getCommentsByBookId: getComments }: CommentsData = await getCommentsData.json()
  
  
  const getBookData = await fetch(`http://localhost:3000/api/books/${getParams}`)
  const { getBookByid }: BookData = await getBookData.json()
  
  //Sum all comments rating in database
  const commentRatingCount = getComments.reduce((acc: number, comment: CommentInterface) => acc + comment.commentRating, 0)


  //If there is no comments in database, then the total rating will be the average of the creator rating and the comment rating by user
  let totalRating

  if(commentRatingCount == 0){
    totalRating = (getBookByid.creator_rating + commentRating) / 2
  }else{
    totalRating = (commentRatingCount + commentRating) / (getComments.length + 2)
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

    await Book.findByIdAndUpdate(getParams, {rating: totalRating.toFixed(1)})
    await newComment.save()

    return NextResponse.json({message: "Comentario enviado!", status: 200})
  } catch (error) {
    console.log(error)
    return NextResponse.json({message: "Falha ao enviar comentario", status: 505})
  }
}