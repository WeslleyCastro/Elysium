"use client"

import { CommentsSkeleton } from "./CommentsSkeleton"
import { CommentInterface } from "@/models/Comment"
import { CommentTextArea } from "./CommentTextArea"
import { StarsRating } from "../StarsRating"
import { getComments } from "@/services/swr"
import { format, formatDistanceToNow, parseISO } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import { DeleteModal } from "./DeleteModal"
import { useWidth } from "@/hooks/useWidth"
import { useSession } from "next-auth/react"

export interface CommentsProps {
  bookId: string,
}

export const Comments = ({ bookId }: CommentsProps) => {
  const { data: userComments, isLoading } = getComments(bookId)
  const {data: session} = useSession()
  const { width } = useWidth()

  const publishedDateFormatted = (date: string) => {
    return format(parseISO(date), "dd/MM/yyyy", { locale: ptBR })
  }

  const publishedDateRelativeToNow = (date: string) => {
    const formatDate = parseISO(date)
    const isMobile = width < 640 ? false : true
    return formatDistanceToNow(formatDate, {
      locale: ptBR,
      addSuffix: isMobile
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
                  <span className="text-base">
                    {comments.creator.username}
                    <time
                      title={publishedDateFormatted(comments.createdAt)} 
                      dateTime={comments.createdAt}
                    >
                      <span className="ml-2 text-xs text-gray-400">{publishedDateRelativeToNow(comments.createdAt)}</span>
                    </time>
                  </span>
                </div>
                
                {session?.user.id == comments.creator._id && <DeleteModal commentId={comments._id!} bookId={bookId}/>}
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