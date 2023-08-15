import { BookProps } from "@/@types/bookProps"
import { BookCard } from "./BookCard"

export const BookCarrousel = async() => {
  const response = await fetch('http://localhost:3000/api/books', {cache: "no-store"})
  const data = await response.json()

  return(
    <section className="flex mt-24 item-center justify-center">
      <div>
        <h2 className="font-semibold text-2xl mb-8">Mais procurados</h2>
        <div className="flex gap-8">
          {data && data.map((book: BookProps) => (
          <BookCard 
            key={book._id}
            image={book.image} 
            title={book.title}
            rating={book.rating}
            _id={book._id}
          />
          ))}
        </div> 
      </div>
    </section>
  )
} 