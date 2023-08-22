import { SwiperBooks } from "./SwiperBooks"

export const BookCarrousel = async() => {
  const response = await fetch('http://localhost:3000/api/books', {cache: 'no-store'})
  const data = await response.json()

  return(
    <SwiperBooks books={data}/>
  )
} 
