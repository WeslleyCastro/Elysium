"use client"
import { MagnifyingGlass } from "phosphor-react"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

export const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("")
  const router = useRouter()
  
  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault()
    if(!searchInput) return
    router.push(`/search?q=${searchInput}`)
    setSearchInput("")
  }
  
  return(
    <form onSubmit={handleOnSubmit} className="flex items-center">
        <input
          className="sm:w-96 rounded-xl p-2 outline-none border-2 text-black mr-2 focus:border-emerald-500 "
          type="text"
          placeholder="Procure por livros..."
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />
        <button type="submit">
          <MagnifyingGlass className="transition-all hover:scale-105 hover:text-emerald-500" size={32}/>
        </button>
      </form>

  )
}