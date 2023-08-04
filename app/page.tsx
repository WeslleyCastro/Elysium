export default function Home() {
  return (
    <main>
      <section className="flex bg-gradient-to-r from-emerald-500 to-emerald-800 text-center items-center justify-center lg:justify-evenly sm py-16">
        <div className="text-white">
          <h1 className="text-5xl font-semibold">Não há nada <br/>melhor que ler</h1>
          <p className="text-zinc-100 py-4">Encontre o melhor livro de presente</p>
          <button className="transition bg-white rounded-2xl py-2 px-8 text-emerald-400 font-semibold hover:scale-110">{"Procurar"}</button>
        </div>
        <img className="hidden lg:block h-96" src="/assets/images/book.svg" alt="" />
      </section>

      <section className="flex my-24 item-center justify-center">
        <div>
          <h2 className="font-semibold text-2xl mb-8">Mais procurados</h2>
          <div className="flex gap-8">
            <div className="flex flex-col w-52">
              <img className="rounded-md" src="https://corujinhalivraria.com.br/imagens/produto/381_525_harry-potter-e-as-reliquias-da-morte-capa-comum-detalhe.jpg" alt="" />
              <span className="py-2">Nome do livro</span>
              <span className="font-bold text-sm text-emerald-600">R$ 60,00</span>
            </div>
          
            <div className="flex flex-col w-52">
              <img className="rounded-md" src="https://corujinhalivraria.com.br/imagens/produto/381_525_harry-potter-e-as-reliquias-da-morte-capa-comum-detalhe.jpg" alt="" />
              <span className="py-2">Nome do livro</span>
              <span className="font-bold text-sm text-emerald-600">R$ 60,00</span>
            </div>
          
            <div className="flex flex-col w-52">
              <img className="rounded-md" src="https://corujinhalivraria.com.br/imagens/produto/381_525_harry-potter-e-as-reliquias-da-morte-capa-comum-detalhe.jpg" alt="" />
              <span className="py-2">Nome do livro</span>
              <span className="font-bold text-sm text-emerald-600">R$ 60,00</span>
            </div>
            <div className="flex flex-col w-52">
              <img className="rounded-md" src="https://corujinhalivraria.com.br/imagens/produto/381_525_harry-potter-e-as-reliquias-da-morte-capa-comum-detalhe.jpg" alt="" />
              <span className="py-2">Nome do livro</span>
              <span className="font-bold text-sm text-emerald-600">R$ 60,00</span>
            </div>
            <div className="flex flex-col w-52">
              <img className="rounded-md" src="https://corujinhalivraria.com.br/imagens/produto/381_525_harry-potter-e-as-reliquias-da-morte-capa-comum-detalhe.jpg" alt="" />
              <span className="py-2">Nome do livro</span>
              <span className="font-bold text-sm text-emerald-600">R$ 60,00</span>
            </div>
          </div>
        </div>

      </section>
      <div>a</div>
    </main>
  ) 
}