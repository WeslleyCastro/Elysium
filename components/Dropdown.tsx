"use client"

import { User } from "phosphor-react"
import { signIn, signOut, useSession } from "next-auth/react"
import { useState } from "react"
import Link from "next/link"

export const Dropdown = () => {
  const { data: session } = useSession()
  const [ isOpen, setIsOpen ] = useState(false)

  return(
    <>
     {session ? (
        <div className="relative">
          <span onClick={() => setIsOpen((state) => !state)} className="cursor-pointer flex flex-col items-center">
            <img className="rounded-full" src={session?.user?.image || ""} width={40} height={40} alt="imagem do usuario" />
          </span>

          {/* Dropdown */}
          {isOpen && 
            <div onMouseLeave={() => setIsOpen((state) => !state)} className="flex flex-col gap-5 absolute rigth right-0 -bottom-52 bg-white p-3 border rounded-md min-w-[200px] text-sm z-50">
              <Link href={`/profile/${session?.user.name}?id=${session?.user.id}`}>Perfil</Link>
              <Link href="/share">Compartilhar</Link>
              <Link href="/contact">Contate-nos</Link>
              <button className="rounded-2xl bg-black text-white py-2" onClick={() => signOut()}>Logout</button>
            </div>}
        </div>
      ):(
        <div>
          <span className="cursor-pointer flex flex-col items-center" onClick={() => signIn()}>
            <User size={32}/>
          </span>
        </div>
      )}
    </>
  )
}