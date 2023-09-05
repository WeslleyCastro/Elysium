"use client"

import { FcGoogle } from "react-icons/fc"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useState } from "react"


interface signInData{
  email: string
  password: string
}

export default function SignInPage(){
  const router = useRouter()
  const { register, handleSubmit } = useForm<signInData>()
  const [error, setError] = useState("")

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
    <section className="flex justify-center items-center h-full">
      <div className="display flex items-center justify-evenly w-full">
        <img className="hidden lg:block w-1/3" src="/images/authentication.svg" alt=""/>

        <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col min-w-[370px] rounded-lg shadow-md p-4 border sm:w-[500px]">
          <h1 className="my-10 text-2xl text-emerald-500 font-bold">
            Faça seu login
          </h1>
  
          <label className="mb-2" htmlFor="userEmail">Email</label>
          <input
            type="text"
            id="userEmail"
            placeholder="Digite seu email"
            className="p-2 border-2 mb-4 rounded-lg focus:outline-emerald-500"
            {...register("email")}
          />
        
          <label className="mb-2" htmlFor="userPassword">Senha</label>
          <input
            type="password"
            id="userPassword"
            placeholder="Digite sua senha"
            className="p-2 border-2 mb-4 rounded-lg focus:outline-emerald-500"
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
            className="cursor-pointer flex justify-center mb-3" 
            onClick={() => signIn("google", {callbackUrl: "/"})}
          >
            <FcGoogle className="text-2xl mr-2"/>Sign in with Google
          </span>

          <span className="text-center mt-4 text-sm">Não tem uma conta? <Link className="underline text-emerald-500" href="/signup">SignUp</Link></span>
        </form>
      </div>
    </section>
  )
} 

