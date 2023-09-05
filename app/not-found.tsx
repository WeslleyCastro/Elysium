import Image from "next/image";
import Link from "next/link";

export default function NotFound(){
  return(
    <section className="flex items-center justify-center h-full flex-col">
      <Image src="/images/notfound.svg" width={400} height={400} alt="Imagem de erro"/>

    <h1 className="text-xl font-semibold mb-4">Pagína não encontrada</h1>
      <span>
        Voltar para o
        <Link className="ml-2 button" href="/">Inicio</Link>
      </span>
    </section>
  )
}