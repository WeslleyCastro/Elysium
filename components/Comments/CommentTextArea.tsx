"use client"

import { useForm } from "react-hook-form"
import { useSession } from "next-auth/react"
import { PaperPlaneRight } from "phosphor-react"
import { StarsRating } from "../StarsRating"
import { useState } from "react"
 
interface CommentForm {
  comment: string
}

interface CommentTextAreaProps {
  bookId: string,
}

export const CommentTextArea = ({bookId}: CommentTextAreaProps) => {
  const [insertRating, setInsertRating] = useState(0)
  const { register, handleSubmit, reset} = useForm<CommentForm>() 
  const {data: session} = useSession()

  const onSubmit = async(data: {comment: string} ) => {
    if(insertRating == 0) return alert("Avalie o livro antes de comentar")
    
    try {
      const response = await fetch(`../api/books/${bookId}`, {
        method: "POST",
        body: JSON.stringify({
          createdBy: session?.user?.id,
          comment: data.comment,
          commentRating: insertRating,
        })
      })
    } catch (error) {
      console.log(error)
    }finally{
      reset()
      setInsertRating(0)
    }
  }
  return (
    <>
     {session ? (
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <textarea
            className="text-sm p-2 border rounded-lg min-w-[300px]"
            placeholder="Digite seu comentario..."
            rows={4}
            required
            {...register("comment")}
          />
          <button className="flex items-center justify-center gap-2 py-2 px-4 bg-emerald-300 text-sm text-white rounded-2xl   transition hover:scale-105">
            <PaperPlaneRight className="sm:block" size={20}/><span className="hidden sm:block">Comentar</span>
          </button>
        </div>
        <StarsRating size={20} insert={setInsertRating} weigth={insertRating}/>
      </form> 
      ):( 
      <p className="text-sm">Faça login para comentar</p>
      )}
    </>
  )
}