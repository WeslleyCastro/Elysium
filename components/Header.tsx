"use client"

import { User } from "phosphor-react"
import { useState } from "react"
import { signIn, useSession, signOut} from "next-auth/react"
import Link from "next/link"
import { SearchBar } from "./SearchBar"

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  return(
    <header className="flex p-4 items-center justify-between sm:justify-evenly border-b-2 w-full bg-white z-10">
      <Link href="/" className="hidden sm:block font-greco text-3xl">
        elysium
      </Link>

      <SearchBar/>
      
      {session ? (
        <div className="relative">
          <span onClick={() => setIsOpen((state) => !state)} className="cursor-pointer flex flex-col items-center">
            <img className="rounded-full" src={session.user?.image as string} width={40} alt="" />
          </span>
        
          {isOpen && 
            <div className="flex flex-col gap-3 absolute -bottom-44 bg-white p-3 border rounded-md min-w-[200px]">
              <Link href="/profile">Perfil</Link>
              <Link href="/share">Compartilhar</Link>
              <a href="">Favoritos</a>
              <button onClick={() => signOut()}>Logout</button>
            </div>
          }
      </div>
      ):(
        <div>
          <span className="cursor-pointer flex flex-col items-center" onClick={() => signIn()}>
            <User size={32}/>
            <span>Logar</span>
          </span>
        </div>
      )}
    </header>
  )
}