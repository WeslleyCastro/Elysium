import { BannerCreate } from "@/components/BannerCreate";
import { BookCarrousel } from "@/components/BookCarousel";
import { BookCardProps } from "@/@types/bookCardProps";
import { AiOutlineLink } from "react-icons/ai";
import Link from "next/link";

export default async function Home() {
  const response = await fetch('http://localhost:3000/api/books', {cache: 'no-store'})
  const data: BookCardProps[] = await response.json()

  return (
    <main>
      <section className="flex bg-gradient-to-r from-emerald-500 to-emerald-800 text-center items-center justify-center lg:justify-evenly py-8 ">
        <div className="text-white">
          <h1 className=" text-3xl sm:text-5xl font-semibold">Não há nada <br/>melhor que ler</h1>
          <p className="text-zinc-100 py-4">Veja os livros melhores avaliados !</p>
          <button className="transition bg-white rounded-2xl py-2 px-8 text-emerald-400 font-semibold hover:scale-110">Procurar</button>
        </div>
        <img className="hidden lg:block h-96" src="/images/book.svg" alt="" />
      </section>
      
      <section className="mt-24">
        <Link href="/search?q=all" className="flex gap-2 font-semibold text-xl hover:text-emerald-500 lg:pl-20 ">
         Ver todos livros <AiOutlineLink size={25}/>
        </Link>
        
        <BookCarrousel books={data}/>
      </section>

      <BannerCreate/>

      <footer className="mt-12 bg-zinc-900 h-28 trans">
          a
      </footer>
    </main>
  ) 
}