"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { FcGoogle } from "react-icons/fc"

interface signInData{
  email: string
  password: string
}

export interface AuthenticateForm {
  state: React.Dispatch<React.SetStateAction<"login" | "register">>
}

export const LoginForm = ({ state }: AuthenticateForm) => {
  const { register, handleSubmit } = useForm<signInData>()
  const [error, setError] = useState("")
  const router = useRouter()

  const onsubmit = async(data: signInData) => {
    const login = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false
    })
    if(login?.error != null){
      setError(login.error)
    }else{
      router.push("/")
    }
  }

  return(
    <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col min-w-[370px] rounded-lg shadow-md p-4 border sm:w-[500px]">
      <h1 className="my-10 text-2xl text-emerald-500 font-bold">
        Faça seu login
      </h1>

      <label className="label-form" htmlFor="userEmail">Email</label>
      <input
        type="text"
        id="userEmail"
        placeholder="Digite seu email"
        className="input-form"
        {...register("email")}
      />

      <label className="label-form" htmlFor="userPassword">Senha</label>
      <input
        type="password"
        id="userPassword"
        placeholder="Digite sua senha"
        className="input-form"
        {...register("password")}
      />
      {error && <span className="text-red-500">{error}</span>}

      <button className="mt-6 w-full py-2 rounded-2xl text-white font-bold transition bg-emerald-500 hover:bg-emerald-600" type="submit">
        Entrar
      </button>

      <fieldset className="border-t border-slate-100 my-6">
        <legend className="mx-auto px text-1xl text-zinc-300">or</legend>
      </fieldset>

      <span 
        className="cursor-pointer flex justify-center mb-3 transition hover:text-emerald-500" 
        onClick={() => signIn("google", {callbackUrl: "/"})}
      >
        <FcGoogle className="text-2xl mr-2"/>Sign in with Google
      </span>

      <span className="text-center mt-4 text-sm">
        Não tem uma conta? <button onClick={() => state("register")} className="underline text-emerald-500">SignUp</button>
      </span>
    </form>
  )
}