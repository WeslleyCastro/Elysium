import { BookCarrousel } from "@/components/BookCarousel";
import { BookCardProps } from "@/@types/bookCardProps";
import { AiOutlineLink } from "react-icons/ai";
import Link from "next/link";
import { getSessionUser } from "@/lib/session";

export default async function Home() {
  const response = await fetch('http://localhost:3000/api/books', {cache: 'no-store'})
  const data: BookCardProps[] = await response.json()
  const session = await getSessionUser()

  return (
    <main>
      <section className="flex bg-gradient-to-r from-emerald-500 to-emerald-800 text-center items-center justify-center lg:justify-evenly py-8 ">
        <div className="text-white">
          <h1 className=" text-3xl sm:text-5xl font-semibold">Não há nada <br/>melhor que ler</h1>
          <p className="text-zinc-100 py-4">Compartilhe suas avaliações!</p>
          <Link href="/share" className="transition bg-white rounded-2xl py-2 px-8 text-emerald-400 font-semibold">Compartilhar</Link>
        </div>
        <img className="hidden lg:block h-96" src="/images/book.svg" alt="livro" />
      </section>
      
      <section className="mt-24">
        <Link href="/search?q=all" className="flex gap-2 font-semibold text-xl hover:text-emerald-500 pl-8 lg:pl-20 w-72 ">
          Ver todos livros <AiOutlineLink size={25}/>
        </Link>
        
        <BookCarrousel books={data}/>
      </section>

      <section className="flex item-center justify-center text-center mt-40">
        <div className="w-3/6 min-w-fit shadow-md rounded-md px-4 py-20 border">
          <p className="text-2xl font-semibold mb-12">
            Terminou de ler o livro? <br/> Compartilhe com todos o que achou
          </p>
          
          {session ? (
            <Link 
              href="/share" 
              className="bg-emerald-300 transition text-white font-bold py-3 px-6 rounded-md hover:bg-emerald-500 ">
              Compartilhar
            </Link>
          ):(
            <Link 
              href="/signin" 
              className="bg-emerald-300 transition text-white font-bold py-3 px-6 rounded-md hover:bg-emerald-500 ">
              Faça login
            </Link>
          )}
        </div>
      </section>
    </main>
  ) 
}