import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import Comments, { CommentInterface } from "@/models/Comment";
import { Book, BookInterface } from "@/models/Book";

export const dynamic = 'force-dynamic';

interface Params {
  params: {
    id: string
  }
}

interface GetBookData {
  getBookByid: BookInterface
}

export const GET = async(req: NextRequest, params: Params) => {
  const getParams = params.params.id

  try {
    await connectToDB()

    const getCommentsByBookId: CommentInterface[] = await Comments.find({commentForBook: getParams}).sort({createdAt: -1}).populate("creator")

    if(!getCommentsByBookId){
      return NextResponse.json({message: "Failed to find comments", status: 404})
    }

    return NextResponse.json(getCommentsByBookId)
  } catch (error) {
    return NextResponse.json({message: "Failed to find comments", status: 500})
  }
}


export const POST = async(req: NextRequest, params: Params) => {
  const { comment, createdBy, commentRating} = await req.json()
  const getParams = params.params.id   // Book id

  const urlComments = `${process.env.BASEURL}/api/books/${getParams}/comments`
  const getCommentsData = await fetch(urlComments)
  const getComments: CommentInterface[] = await getCommentsData.json()
  
  const urlBook = `${process.env.BASEURL}/api/books/${getParams}`
  const getBookData = await fetch(urlBook)
  const { getBookByid }: GetBookData = await getBookData.json()
  
  
  //Sum all comments rating in database
  const commentRatingCount = getComments.reduce((acc: number, comment: CommentInterface) => acc + comment.commentRating, 0)


  //If there is no comments in database, then the total rating will be the average of the creator rating and the comment rating by user
  //If there is comments in database, then the total rating will be the average of the creator rating, the comment rating by user and the comments rating in database

  let totalRating

  if(commentRatingCount == 0){
    totalRating = (getBookByid.creator_rating + commentRating) / 2
  }else{
    totalRating = (commentRatingCount + commentRating + getBookByid.creator_rating ) / (getComments.length + 2)
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

    await Book.findByIdAndUpdate(getParams, {rating: totalRating.toFixed(1), new: true})
    await newComment.save()
    
    return NextResponse.json({message: "Comentario enviado!", status: 200})
  } catch (error) {
    console.log(error)
    return NextResponse.json({message: "Falha ao enviar comentario", status: 505})
  }
}

export const DELETE = async(req: NextRequest, params: Params) => {
  const { commentId } = await req.json() 
  
  const getParams = params.params.id   // Book id

  try {
    connectToDB()
    
    const isDeleted = await Comments.findByIdAndDelete(commentId)
    
    if(!isDeleted) throw new Error("Failed to delete comment") 

    const urlComments = `${process.env.BASEURL}/api/books/${getParams}/comments`
    const getCommentsData = await fetch(urlComments)
    const getComments: CommentInterface[] = await getCommentsData.json()
  
    //Sum all comments rating in database
    const commentRatingCount = getComments.reduce((acc: number, comment: CommentInterface) => acc + comment.commentRating, 0)
    
    await Book.findByIdAndUpdate(getParams, {rating: commentRatingCount.toFixed(1), new: true})
    
    return NextResponse.json({status: 200})

  } catch (error) {
    console.log(error)
  }
}