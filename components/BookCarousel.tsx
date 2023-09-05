"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { BookCardProps } from "@/@types/bookCardProps"
import { BookCard } from "./BookCard"
import "swiper/css"
import "swiper/css/navigation"

interface BookCarrouselProps {
  books: BookCardProps[]
}

export const BookCarrousel = ({ books }: BookCarrouselProps) => {
  const breakpoint = {
    1600: {
      slidesPerView: 6,
    },
    900: {
      slidesPerView: 4,
    },
    600: {
      slidesPerView: 2,
    }
  }
  return(
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#111',
          '--swiper-pagination-color': '#111',
        }}
        spaceBetween={5}
        modules={[Navigation]}
        navigation
        breakpoints={breakpoint}
        slidesPerView={1}
      >
        {books && books.map((book: BookCardProps) => (
          <SwiperSlide key={book._id} className="pl-24 sm:pl-20">
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
