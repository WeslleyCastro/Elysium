import { BookCarrousel } from "@/components/BookCarrousel";

export default function Home() {
  return (
    <main>
      <section className="flex bg-gradient-to-r from-emerald-500 to-emerald-800 text-center items-center justify-center lg:justify-evenly py-16">
        <div className="text-white">
          <h1 className="text-5xl font-semibold">Não há nada <br/>melhor que ler</h1>
          <p className="text-zinc-100 py-4">Veja os livros melhores avaliados !</p>
          <button className="transition bg-white rounded-2xl py-2 px-8 text-emerald-400 font-semibold hover:scale-110">{"Procurar"}</button>
        </div>
        <img className="hidden lg:block h-96" src="/assets/images/book.svg" alt="" />
      </section>

      <BookCarrousel/>

      <section className="flex item-center justify-center text-center mt-40">
        <div className="w-3/6 min-w-fit shadow-md rounded-md py-8 border">
          <p className="text-2xl font-semibold mb-8">Terminou de ler o livro? <br/> Compartilhe com todos o que achou</p>
            <button className="bg-emerald-300 transition text-white font-bold py-3 px-6 rounded-md hover:bg-emerald-500">Compartilhar</button>
        </div>
      </section>


      <footer className="mt-12 bg-zinc-900 h-28">
          a
      </footer>
    </main>
  ) 
}