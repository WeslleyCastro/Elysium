"use client"

import { CommentsSkeleton } from "./CommentsSkeleton"
import { CommentInterface } from "@/models/Comment"
import { CommentTextArea } from "./CommentTextArea"
import { StarsRating } from "../StarsRating"
import { getApi } from "@/services/swr"
import { format, formatDistanceToNow, parseISO } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"

export interface CommentsProps {
  bookId: string,
}

export const Comments = ({ bookId }: CommentsProps) => {
  const url = `/api/books/${bookId}/comments`
  const { data: userComments, isLoading } = getApi(url)

  const publishedDateFormatted = (date: string) => {
    return format(parseISO(date), "dd/MM/yyyy", { locale: ptBR })
  }

  const publishedDateRelativeToNow = (date: string) => {
    const formatDate = parseISO(date)
    return formatDistanceToNow(formatDate, {
      locale: ptBR,
      addSuffix: true
    })
  }

  return (
    <>
      {isLoading ? <CommentsSkeleton/>:(
      <div>
        <h2 className="font-medium text-xl">Comentarios</h2>
        
        <CommentTextArea bookId={bookId}/>
        <div className="mt-8 flex flex-col justify-center sm:justify-start sm:max-w-[500px] gap-6">
          {userComments && userComments.map((comments: CommentInterface) => (
            <div key={comments._id as string} className="border p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <img className="rounded-full" src={comments.creator.image} alt="imagem do usuario" width={30} height={30}/>
                  <span className="text-base">{comments.creator.username}</span>
                </div>
                <time
                  className="text-xs text-gray-400"
                  title={publishedDateFormatted(comments.createdAt)} 
                  dateTime={comments.createdAt}
                >
                  {publishedDateRelativeToNow(comments.createdAt)}
                </time>
              </div>
              <StarsRating rating={comments.commentRating} size={15}/>
              <p className="text-sm mt-4">{comments.comment}</p>
            </div>
            ))}
        </div>
      </div>)}
    </>
  )
}