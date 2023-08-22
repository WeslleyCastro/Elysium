"use client"

import { BookCardProps } from "@/@types/bookCardProps"
import { Swiper, SwiperSlide } from 'swiper/react'
import { BookCard } from "../BookCard"
import 'swiper/css';

export const SwiperBooks = ({books}: {books: BookCardProps[]}) => {
 
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
    <section className="mt-24" >
          <Swiper
            spaceBetween={5}
            breakpoints={breakpoint}
            slidesPerView={1}
          >
            {books && books.map((book: BookCardProps) => (
              <SwiperSlide key={book._id} className="lg:pl-20">
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
    </section>
  )
} 
