"use client"

import { imageToBase64 } from "@/utils/convertToBase64"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import { useForm } from "react-hook-form"


interface IFormInput {
  username: string,
  email: string,
  password: string
}


export default function SignUpPage() {
  const [image64, setImage64] = useState("")

  const { register, handleSubmit, reset} = useForm<IFormInput>()

  const handleChangeImage = async(e: ChangeEvent<HTMLInputElement>) => {
    await imageToBase64(e)
      .then((response) => {
        setImage64(response as string)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onsubmit = async(data: IFormInput) => {
    try {
      await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
          image: image64
        })
      })
    } catch (error) {
      console.log(error)
    }
   
  }

  return(
    <section className="flex mt-28 justify-center">
      <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col max-w-[350px]">
        <div className="flex flex-col gap-4 mb-4"> 
          {image64 !== "" && (
            <Image 
              src={image64}
              width={90} 
              height={90}
              alt="imagem selecionada"  
              className="bg-gray-400 rounded-full border-emerald-500 w-24 h-24 object-cover"
            />
          )}
          <input type="file" onChange={handleChangeImage}/>
        </div>
        
          <label htmlFor="" className="label-form">Usuario</label>
          <input 
            className="input-form"
            type="text" 
            placeholder="Nome de usuario"
            {...register("username")}
          />

          <label htmlFor="" className="label-form">Email</label>
          <input
            className="input-form"
            type="email" 
            placeholder="Email"
            {...register("email")}
          />

          <label htmlFor="" className="label-form">Senha</label>
          <input 
            className="input-form"
            type="password" 
            placeholder="Senha"
            {...register("password")}
          />
          
          <button className="button-form">Registrar-se</button>
      </form>
    </section>
  )
}