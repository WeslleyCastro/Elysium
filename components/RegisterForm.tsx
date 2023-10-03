"use client"

import { useForm } from "react-hook-form"
import axios from "axios"
import { toast } from "react-toastify"
import { useState } from "react"
import { AuthenticateForm } from "@/components/LoginForm"


interface IFormInput {
  username: string,
  email: string,
  password: string
}

interface IError{
  error: string
  type: string
}

export const RegisterForm = ({state}: AuthenticateForm) => {
  const { register, handleSubmit, reset } = useForm<IFormInput>()
  const [error, setError] = useState<IError>({ error: "", type: "" })

  const onsubmit = async(data: IFormInput) => {
    try {
      await axios.post("/api/register", {
        username: data.username, 
        email: data.email, 
        password: data.password
      })
      toast.success("Registrado com sucesso")
      reset()
      state("login")
    } catch (error: any) {
      setError({
        error: error.response.data.error,
        type: error.response.data.type
      })
    } 
  }
  return(
    <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col min-w-[370px] rounded-lg shadow-md p-4 border sm:w-[500px]">
      <h1 className="my-10 text-2xl text-emerald-500 font-bold">
        Registrar
      </h1>
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

      <fieldset className="border-t border-slate-100 my-6">
        <legend className="mx-auto px text-1xl text-zinc-400">
          <button 
            className="transition hover:text-emerald-500" 
            onClick={() => state("login")}
          >
            Já tem uma conta?
          </button>
        </legend>
      </fieldset>
    </form>
  )
}