"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { BookCardProps } from "@/@types/bookCardProps"
import { BookCard } from "./BookCard"
import "swiper/css"

interface BookCarrouselProps {
  books: BookCardProps[]
}

export const BookCarrousel = ({ books }: BookCarrouselProps) => {
  const breakpoint = {
    1600: {
      slidesPerView: 6,
    },
    1400: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 3,
    },

  }

  return(
    <>
      <Swiper
        spaceBetween={5}
        breakpoints={breakpoint}
        slidesPerView={1}
      >
        {books && books.map((book: BookCardProps) => (
          <SwiperSlide key={book._id} className="pl-20">
            <BookCard
              image={book.image}
              title={book.title}
              rating={book.rating}
              _id={book._id}
              author={book.author}
              creator_rating={book.creator_rating}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
} 
