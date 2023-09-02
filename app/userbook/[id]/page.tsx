import { Comments } from "@/components/Comments/Comments"
import { StarsRating } from "@/components/StarsRating"
import { BookInterface } from "@/models/Book"
import { CommentInterface } from "@/models/Comment"
import { formatCurrency } from "@/utils/formatCurrency"
import Image from "next/image"
import Link from "next/link"

interface UserBookProps {
  params: {
    id: string
  }
}

interface UserBookData{
  getBookByid: BookInterface,
  getCommentsByBookId: CommentInterface[]
}

export default async function UserBook({params}: UserBookProps){
  const res = await fetch(`http://localhost:3000/api/books/${params.id}`, {cache: "no-store"})
  const {getBookByid: book, getCommentsByBookId: userComments}: UserBookData = await res.json()   

  const verifyRating = book.rating !== 0 ? book.rating : book.creator_rating

  return(
    <section className="p-4">
      <div className="flex flex-col sm:flex-row my-8 gap-6">
         <div className="flex flex-col gap-2 min-w-[250px]">
           <Image
            className="mb-2"
            src={book.image}
            alt={book.title}
            width={250}
            height={380}
          />
          <StarsRating size={20} rating={verifyRating}/>
          <span>Valor pago <strong className="text-emerald-500">{formatCurrency(book.price!)}</strong></span>
        </div>
       
        <div className="lg:w-2/6"> 
          <h1 className="font-medium text-2xl">{book.title}</h1>
            <span className="italic text-sm text-gray-500">
              por <Link href={`/profile/${book.creator.username}?id=${book.creator._id}`} className="underline">{book.creator.username}</Link>
            </span>
            <p className="text-justify mt-4 indent-8">{book.description}</p>
        </div>
      </div>
     
      <section className="sm:mt-28">
        <Comments userComments={userComments} bookId={params.id}/>
      </section>
      
    </section>
  )
}
