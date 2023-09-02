"use client"

import { Star } from "phosphor-react"
import { Dispatch, SetStateAction } from "react"

interface StarsRatingProps {
  rating?: number
  insert?: Dispatch<SetStateAction<number>>
  weigth?: number
  size: number
}

export const StarsRating = ({ rating, insert, weigth, size}: StarsRatingProps) => {
  let array = [1, 2, 3, 4, 5]
 
  const onClickStar = (index: number) => {
    insert!(index)
  }

  return(
    <span className="flex items-center">
     {!insert ? array.map((index) => {
      return <Star key={index} size={size} weight={index <= rating! ? "fill" : "light"} color="#FBBF24"/>
     }): 
     array.map((index) => {
      return (
        <button key={index} type="button" onClick={() => onClickStar(index)}>
          <Star weight={index <= weigth! ? "fill" : "light"} size={size}  color="#FBBF24"/>
        </button>
      )})}
      <span className="text-xs ml-1">{rating}</span>
    </span>
  )
}
