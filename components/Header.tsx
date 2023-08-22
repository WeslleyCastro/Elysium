"use client"

import { User } from "phosphor-react"
import { useState } from "react"
import { signIn, useSession, signOut} from "next-auth/react"
import Link from "next/link"
import { SearchBar } from "./SearchBar"
import Image from "next/image"

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  return(
    <header className="flex p-6 items-center justify-between sm:justify-evenly border-b-2 w-full z-10">
      <Link href="/" className="hidden sm:block text-3xl">
        <Image src="/images/elysium.svg" alt="Logo" width={130} height={23} />
      </Link>

      <SearchBar/>
      
      {session ? (
        <div className="relative">
          <span onClick={() => setIsOpen((state) => !state)} className="cursor-pointer flex flex-col items-center">
            <img className="rounded-full" src={session.user?.image as string} width={40} alt="imagem do usuario" />
          </span>
        
          {isOpen && 
            <div className="flex flex-col gap-5 absolute rigth right-0 -bottom-52 bg-white p-3 border rounded-md min-w-[200px] text-sm">
              <Link href="/profile">Perfil</Link>
              <Link href="/share">Compartilhar</Link>
              <a href="">Favoritos</a>
              <button className="rounded-2xl bg-black text-white py-2" onClick={() => signOut()}>Logout</button>
            </div>
          }
      </div>
      ):(
        <div>
          <span className="cursor-pointer flex flex-col items-center" onClick={() => signIn()}>
            <User size={32}/>
          </span>
        </div>
      )}
    </header>
  )
}