"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import axios from "axios"
import { toast } from "react-toastify"
import { useState } from "react"

interface IFormInput {
  username: string,
  email: string,
  password: string
}

interface IError{
  error: string
  type: string
}

export default function SignUpPage() {
  const { register, handleSubmit, reset } = useForm<IFormInput>()
  const [error, setError] = useState<IError>({ error: "", type: "" })
  const router = useRouter()

  const onsubmit = async(data: IFormInput) => {
    try {
      await axios.post("/api/register", {
        username: data.username, 
        email: data.email, 
        password: data.password
      })
      toast.success("Registrado com sucesso")
      reset()
      router.push("/login")
    } catch (error: any) {
      setError({
        error: error.response.data.error,
        type: error.response.data.type
      })
    } 
  }

  return(
    <section className="flex w-full h-full items-center justify-center p-3">
      <form onSubmit={handleSubmit(onsubmit)} className="w-full sm:w-96 flex flex-col border py-8 px-4 rounded-md">
        <h1 className="text-2xl font-semibold text-emerald-500 my-4">Registrar</h1>
        <label htmlFor="username" className="label-form">Usuario</label>
        <input 
          className="input-form"
          type="text" 
          id="username"
          placeholder="Nome de usuario"
          {...register("username")}
        />
        
        {error.type === "user" && <p className="text-red-500 text-sm mt-1">{error.error}</p>}

        <label htmlFor="email" className="label-form">Email</label>
        <input
          className="input-form"
          type="email" 
          placeholder="Email"
          id="email"
          {...register("email")}
        />
       
        {error.type === "email" && <p className="text-red-500 text-sm mt-1">{error.error}</p>}

        <label htmlFor="password" className="label-form">Senha</label>
        <input 
          className="input-form"
          type="password" 
          id="password"
          placeholder="Senha"
          {...register("password")}
        />
        <button className="button mt-4">Registrar-se</button>
      </form>
    </section>
  )
}