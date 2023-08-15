"use client"

import { useSession } from "next-auth/react"

export default function Profile(){
  const { data: session } = useSession()
  
  return(
    <section className="p-4">
        <div className="flex items-center gap-8">
          <img
            className="rounded-full w-28 outline outline-4 outline-emerald-500"
            src={session?.user?.image!}
            alt=""
          />
          <div>
            <h1 className="font-semibold text-2xl">
              {session?.user?.name}
            </h1>
            <span className="italic text-gray-400">Descrição do usuario</span>
          </div>
        </div>
    </section>
  )
}