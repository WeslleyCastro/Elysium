import { AiOutlineLink } from "react-icons/ai";
import Link from "next/link";
import { BooksHome } from "@/components/BooksHome";
import { Suspense } from "react";
import { CarouselSkeleton } from "@/components/CarouselSkeleton";
import { BannerShareBook } from "@/components/BannerShareBook";

export default function Home() {
  return (
    <main>
      <section className="flex bg-gradient-to-r from-emerald-500 to-emerald-800 text-center items-center justify-center lg:justify-evenly py-8 ">
        <div className="text-white">
          <h1 className=" text-3xl sm:text-5xl font-semibold">Não há nada <br/>melhor que ler</h1>
          <p className="text-zinc-100 py-6">Compartilhe suas avaliações!</p>
          <Link href="/share" className="bg-white rounded-2xl py-2 px-8 text-emerald-400 font-semibold transition hover:bg-zinc-50">Compartilhar</Link>
        </div>
        <img className="hidden lg:block h-96" src="/images/book.svg" alt="livro" />
      </section>
      
      <section className="mt-24">
        <Link href="/search?q=all" className="flex gap-2 font-semibold text-xl hover:text-emerald-500 pl-8 lg:pl-20 w-72 ">
          Ver todos livros <AiOutlineLink size={25}/>
        </Link>
        
        <Suspense fallback={<div className="overflow-hidden pt-4 flex gap-16 ml-20"><CarouselSkeleton quantity={5}/></div>}>
          <BooksHome/>
        </Suspense>
      </section>

      <BannerShareBook/>
    </main>
  ) 
}