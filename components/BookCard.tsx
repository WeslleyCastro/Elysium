import { BookProps } from "@/@types/bookProps";
import { StarsRating } from "./StarsRating";
import Link from "next/link";


export const BookCard = ({ title, image, rating, _id}: BookProps) => {
  let newTitle

  if(title.length > 25){
    newTitle = title.slice(0, 25) + '...'
  }

  return(
    <Link href={`${title.replace(/ /g, '-')}?q=${_id}`} className="flex flex-col w-52 transition hover:scale-110">
      <img className="rounded-md " src={image} alt="Imagem do livro" />
      <span className="py-2" title={title}>{newTitle}</span>
      <StarsRating rating={rating}/>
    </Link>
  )
}