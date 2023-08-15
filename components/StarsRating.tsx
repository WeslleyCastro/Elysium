"use client"

import { Star } from "phosphor-react"

interface StarsRatingProps {
  rating: number
}

export const StarsRating = ({ rating }: StarsRatingProps) => {
  let array = [1, 2, 3, 4, 5]


  return(
    <span className="flex items-center">
     {array.map((index) => {
      return <Star key={index} size={16} weight={index <= rating ? "fill" : "light"} color="#FBBF24"/>
     })}
      <span className="text-xs ml-1">{rating}</span>
    </span>
  )
}