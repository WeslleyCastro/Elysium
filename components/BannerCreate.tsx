"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"

export const BannerCreate = () => {
  const {data: session} = useSession()
  
  return(
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
              Logar
            </Link>
          )}
        </div>
      </section>
  )
}