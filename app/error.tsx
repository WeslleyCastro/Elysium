"use client"

import Image from "next/image";

export default function error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}){
  return(
    <section className="flex items-center justify-center h-full flex-col">
      <Image src="/images/errorcomputer.svg" height={400} width={400} alt="computador com erro"/>
      <h1 className="text-xl font-semibold mb-4">Ocorreu um erro</h1>
      <button onClick={() => reset()} className="ml-2 button">Tentar Novamente</button>
      
    </section>
  )
}