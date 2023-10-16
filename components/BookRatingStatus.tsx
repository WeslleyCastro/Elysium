"use client"

import { getComments } from "@/services/swr"
import { CommentInterface } from "@/models/Comment"
import { Star } from "phosphor-react"
import { StarsRating } from "./StarsRating"

interface BookRatingStatusProps {
  bookId: string
  ratingBook: number | undefined
}

export const BookRatingStatus = ({bookId, ratingBook}: BookRatingStatusProps) => {
  const { data: userComments, isLoading } = getComments(bookId)

  const ratingPercentage = (ratingNumber: number) => {
    const commentsQuantity = userComments?.filter((comment: CommentInterface) => comment.commentRating === ratingNumber)
    if(commentsQuantity.length == 0) return 0
    const countRatingPercentage = (commentsQuantity?.length / userComments?.length) * 100
    return countRatingPercentage.toFixed(1)
  }

  const ratingQuantityByNumber = (ratingNumber: number) => {
    const ratingQuantity = userComments?.filter((comment: CommentInterface) => comment.commentRating === ratingNumber)
    return ratingQuantity.length
  } 

  const array = [5, 4, 3, 2, 1]

  return(
    <>
      {isLoading ? (
      <div className="skeleton-color animate-pulse border rounded-md min-w-[290px] xl:ml-8"></div>
      ):(
        <div className="border rounded-md p-4 max-w-xs xl:ml-8">
          <div className="mb-8">
            <p className="text-lg my-2">{userComments?.length} avaliações de comentario</p>
            <StarsRating size={32} rating={ratingBook}/>
          </div>
          
          <div className="flex flex-col gap-8">
            {array.map((ratingValue) => (
              <div className="flex gap-2 items-center" key={ratingValue + "key"}>
                <Star weight="fill" color="#FBBF24" size={25}/> {ratingValue}
                <progress
                  max={100}
                  title={ratingQuantityByNumber(ratingValue)}
                  value={ratingPercentage(ratingValue)}
                />
                 {ratingPercentage(ratingValue) + "%"}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}