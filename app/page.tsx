import { BannerCreate } from "@/components/BannerCreate";
import { BookCarrousel } from "@/components/BookCarrousel";

export default function Home() {

  return (
    <main>
      <section className="flex bg-gradient-to-r from-emerald-500 to-emerald-800 text-center items-center justify-center lg:justify-evenly py-8">
        <div className="text-white">
          <h1 className="text-5xl font-semibold">Não há nada <br/>melhor que ler</h1>
          <p className="text-zinc-100 py-4">Veja os livros melhores avaliados !</p>
          <button className="transition bg-white rounded-2xl py-2 px-8 text-emerald-400 font-semibold hover:scale-110">{"Procurar"}</button>
        </div>
        <img className="hidden lg:block h-96" src="/images/book.svg" alt="" />
      </section>

      <BookCarrousel/>

      <BannerCreate/>


      <footer className="mt-12 bg-zinc-900 h-28">
          a
      </footer>
    </main>
  ) 
}