"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

export const BannerShareBook = () => {
  const { data: session } = useSession()

  return(
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
  )
}