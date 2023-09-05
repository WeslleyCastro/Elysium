import { BookCardProps } from "@/@types/bookCardProps";
import { StarsRating } from "./StarsRating";
import Link from "next/link";
import Image from "next/image";

export const BookCard = ({ title, image, rating, _id, author, creator_rating}: BookCardProps) => {
  const verifyRating = rating !== 0 ? rating : creator_rating
  let newTitle = title

  if(newTitle.length > 20){
    newTitle = title.slice(0, 20) + '...'
  }

  return(
    <Link href={`/userbook/${_id}`} className="flex flex-col justify-center transition hover:scale-110 min-h-[450px] max-w-[230px]">
      <Image 
        className="rounded-md object-cover max-h-[300px]" 
        src={image} 
        height={320} 
        width={210} 
        alt="Imagem do livro"  
      />
      <span title={title}>{newTitle}</span>
      <span className="pb-1 text-xs italic text-gray-500">{author}</span>
      <StarsRating size={16} rating={verifyRating}/>
    </Link>
  )
}

