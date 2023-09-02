"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

interface IFormInput {
  username: string,
  email: string,
  password: string
}

export default function SignUpPage() {
  const { register, handleSubmit, reset } = useForm<IFormInput>()
  const router = useRouter()

  const onsubmit = async(data: IFormInput) => {
    try {
      await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        })
      })
      .then(() => {
        reset()
        router.push("/signin")
        toast.success("Registrado com sucesso")
      })
    } catch (error) {
      toast.error("Erro ao registrar")
      console.log(error)
    }
  }

  return(
    <section className="flex mt-28 justify-center w-full">
      <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col w-80">
        <label htmlFor="username" className="label-form">Usuario</label>
        <input 
          className="input-form"
          type="text" 
          id="username"
          placeholder="Nome de usuario"
          {...register("username")}
        />

        <label htmlFor="email" className="label-form">Email</label>
        <input
          className="input-form"
          type="email" 
          placeholder="Email"
          id="email"
          {...register("email")}
        />

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