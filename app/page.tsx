import { BookCarrousel } from "@/components/BookCarousel";
import { BookCardProps } from "@/@types/bookCardProps";
import { AiOutlineLink } from "react-icons/ai";
import { getSessionUser } from "@/lib/session";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const url = `${process.env.BASEURL}/api/books`
  const data: BookCardProps[] = await fetch(url, {cache: 'no-store'})
  .then((response) => response.json())
  .catch((error) => console.log(error))
  const session = await getSessionUser()

  return (
    <main>
      <section className="flex bg-gradient-to-r from-emerald-500 to-emerald-800 text-center items-center justify-center lg:justify-evenly py-8 ">
        <div className="text-white">
          <h1 className=" text-3xl sm:text-5xl font-semibold">Não há nada <br/>melhor que ler</h1>
          <p className="text-zinc-100 py-6">Compartilhe suas avaliações!</p>
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

      <section className="px-2 flex items-center justify-center mt-40">
        <div className="flex shadow rounded-md items-center justify-center">
          <Image
            src="images/upload.svg"
            alt="compartilhe"
            width={400}
            height={300}
            className="max-md:hidden"
          />
          <div className="px-4 py-20 text-center md:pr-8" >
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
        </div>
      </section>
    </main>
  ) 
}