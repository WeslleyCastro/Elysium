import { BookCardProps } from "@/@types/bookCardProps"
import { BookCard } from "@/components/BookCard"


interface SearchProps{
  searchParams: {
    q: string
  }
}

export default async function SearchPage({searchParams}: SearchProps){
  const url = `${process.env.BASEURL}/api/books`
  let data

  if(searchParams.q == "all"){
    const response = await fetch(url)  
    data = await response.json()
  }else {
    const response = await fetch(`${url}/search?q=${searchParams.q}`, {cache: "no-store"})  
    data = await response.json()
  }


  return(
    <section className="min-h-screen p-4">
      <h1 className="text-center mt-4 mb-12 text-xl font-bold">{searchParams.q == "all" ? "Todos os livros" : `Buscas para ${searchParams.q}`}</h1>

      <div className="flex justify-center lg:justify-start gap-16 flex-wrap">
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