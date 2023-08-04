import { BookCard } from "./BookCard"

export const BookCarrousel = () => {
  return(
    <section className="flex mt-24 item-center justify-center">
      <div>
        <h2 className="font-semibold text-2xl mb-8">Mais procurados</h2>
        <div className="flex gap-8">
          <BookCard/>
          <BookCard/>
          <BookCard/>
          <BookCard/>
          <BookCard/>
        </div> 
      </div>
    </section>
  )
}