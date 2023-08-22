"use client"
import { MagnifyingGlass } from "phosphor-react"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

interface SearchBarForm{
  searchInput: string
}

export const SearchBar = () => {
  const router = useRouter()
  const { register, handleSubmit} = useForm<SearchBarForm>()

  const onSubmit = (data: SearchBarForm) => {
    console.log(data)
    if(!data) return
    router.push(`/search?q=${data}`)
  }


  return(
    <form onSubmit={() => handleSubmit(onSubmit)} className="flex items-center">
        <input
          className="sm:w-96 rounded-xl p-2 outline-none border-2 text-black mr-2 focus:border-emerald-500 "
          type="text"
          placeholder="Procure por livros..."
          {...register("searchInput")}
        />
        <button type="submit">
          <MagnifyingGlass className="transition-all hover:scale-105 hover:text-emerald-500" size={32}/>
        </button>
      </form>

  )
}