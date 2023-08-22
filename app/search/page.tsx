import { BookCardProps } from "@/@types/bookCardProps"
import { BookCard } from "@/components/BookCard"

interface SearchProps{
  searchParams: {
    q: string
  }
}

export default async function SearchPage({searchParams}: SearchProps){
 
  const response = await fetch(`http://localhost:3000/api/searchbooks?q=${searchParams.q}`, { cache: 'no-store' })  
  const data = await response.json()
  

  return(
    <section className="p-4">
      <h1 className="text-center mt-4 mb-12 text-xl font-bold">Buscas para {searchParams.q}</h1>

      <div className="flex gap-4">
        {data.map((book: BookCardProps) => (
          <BookCard
            _id={book._id}
            image={book.image}
            rating={book.rating}
            title={book.title}
            key={book._id}
            author={book.author}
            creator_rating={book.creator_rating}
          />
        ))}
      </div>

    </section>
  )
}