"use client"
import { MagnifyingGlass, User } from "phosphor-react"

export const Header = () => {
  return(
    <header className="flex p-4 items-center justify-between sm:justify-evenly border-b-2">
      <span className="hidden sm:block font-greco text-3xl">elysium</span>
      
      <div className="flex items-center">
        <input 
          className="sm:w-96 rounded-xl p-2 outline-none border-2 text-black mr-2 focus:border-emerald-500 " 
          type="text"
          placeholder="Procure por livros..."
        />
        <button>
          <MagnifyingGlass className="transition-all hover:scale-105 hover:text-emerald-500" size={32}/>
        </button>
      </div>

      <button>
        <User size={32}/>
      </button>
    </header>
  )
}