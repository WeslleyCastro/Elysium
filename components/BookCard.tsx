export const BookCard = () => {
  return(
    <div className="flex flex-col w-52 transition hover:scale-110">
      <img className="rounded-md " src="https://corujinhalivraria.com.br/imagens/produto/381_525_harry-potter-e-as-reliquias-da-morte-capa-comum-detalhe.jpg" alt="" />
      <span className="py-2">Nome do livro</span>
      <span className="font-bold text-sm text-emerald-600">R$ 60,00</span>
   </div>
  )
}