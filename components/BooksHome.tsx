import { BookCardProps } from "@/@types/bookCardProps"
import { BookCarrousel } from "./BookCarousel"

export const BooksHome = async() => {
  const url = `${process.env.BASEURL}/api/books`
  const data: BookCardProps[] = await fetch(url, {cache: 'no-store'})
  .then((response) => response.json())
  .catch((error) => console.log(error))

  return(
    <>
      <BookCarrousel books={data}/>
    </>
  )
}