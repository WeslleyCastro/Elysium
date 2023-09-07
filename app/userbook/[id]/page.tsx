import { Comments } from "@/components/Comments/Comments"
import { CommentsSkeleton } from "@/components/Comments/CommentsSkeleton"
import { StarsRating } from "@/components/StarsRating"
import { BookInterface } from "@/models/Book"
import { formatCurrency } from "@/utils/formatCurrency"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { RiFilePaper2Fill } from "react-icons/ri"
import { AiFillStar } from "react-icons/ai"

interface UserBookProps {
  params: {
    id: string
  }
}

interface BookRequest {
  getBookByid: BookInterface,
  status: number
}

export default async function UserBook({params}: UserBookProps){
  const url = `${process.env.BASEURL}/api/books/${params.id}`

  const res = await fetch(url, {cache: "no-store"})
  const {getBookByid: book, status }: BookRequest = await res.json()   
  
  if(status === 404) notFound()

  const verifyRating = book.rating !== 0 ? book.rating : book.creator_rating

  return(
    <section className="p-4">
       
       {/* Book information */}
      <div className="flex flex-col sm:flex-row my-8 gap-6">
         <div className="flex flex-col min-w-[250px]">
          <Image
            className="mb-2"
            src={book.image}
            alt={book.title}
            width={250}
            height={380}
          />
          <span className="pb-2 text-sm italic text-gray-500">{book.author}</span>
          <StarsRating size={20} rating={verifyRating}/>
          <span className="pt-2">Valor pago <strong className="text-emerald-500">{formatCurrency(book.price!)}</strong></span>
        </div>
       
        <div className="lg:w-2/6 flex flex-col justify-between"> 
          <div>
            <h1 className="font-semibold text-2xl">{book.title}</h1>
              <span className="italic text-sm text-gray-500">
                por <Link href={`/profile/${book.creator.username}?id=${book.creator._id}`} className="underline">{book.creator.username}</Link>
              </span>
              <p className="text-justify mt-4 indent-8">{book.description}</p>
          </div>
          
          {/* Additional information */}
          <div className="max-md:mt-6 border-t flex gap-4">
            <div className="mt-3 flex flex-col items-center py-1 px-3 rounded-lg shadow gap-1 border-t">
              <span className="text-xs">Paginas</span>
              <span className="text-emerald-500"><RiFilePaper2Fill size={22}/></span>
              <span className="text-sm">{book.number_pages != null ? book.number_pages : ""}</span>
            </div>

            <div className="mt-3 flex flex-col items-center py-1 px-3 rounded-lg shadow gap-1 border-t">
              <span className="text-xs">Criador</span>
              <span className="text-emerald-500"><AiFillStar size={22}/></span>
              <span className="text-sm">{book.creator_rating}</span>
            </div>
          </div>
        </div>
      </div>
     
      <section className="sm:mt-28">
        <Suspense fallback={<CommentsSkeleton/>}>
          <Comments bookId={params.id}/>
        </Suspense>
      </section>
    </section>
  )
}
