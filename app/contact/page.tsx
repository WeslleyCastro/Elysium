"use client"

import Image from "next/image";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser"
import { toast } from "react-toastify";
import { useState } from "react";

interface IFormEmail {
  username: string
  email: string
  text: string
}

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const { register, reset, handleSubmit } = useForm<IFormEmail>()

  const onSubmit = async(data: IFormEmail) => {
    setLoading(true)

    const { email, username, text } = data

    const templateParams = {
      from_name: username,
      email: email,
      message: text
    }

    emailjs.send("service_njax59h", "template_lhjajwm", templateParams, "PgPCeER7opW-GlLZs")
    .then(() => {
      toast.success("Email enviado com sucesso")
      reset()
    })
    .catch((error) => {
      console.log(error)
      toast.error("Erro ao enviar email")
    })
    .finally(() => setLoading(false))
  }

  return(
    <section>
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-800 p-16 text-white">
        <h1 className="font-semibold text-2xl pb-6 drop-shadow">Entre em contato conosco</h1>
        <p className="text-justify max-w-5xl font-medium leading-7">
          Estamos sempre à disposição para ouvir você. Seja uma pergunta, sugestão, elogio ou até mesmo uma reclamação, estamos aqui para atendê-lo da melhor maneira possível. Sua opinião é importante para nós e estamos ansiosos para receber seu feedback.
        </p>
      </div>

      <div className="py-12 flex justify-evenly">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-20 flex flex-col drop-shadow-sm w-96">
          <label className="label-form" htmlFor="name">Nome</label>
          <input 
            className="input-form" 
            id="name" 
            type="text" 
            placeholder="Digite seu Nome"
            {...register("username")}
          />

          <label className="label-form" htmlFor="iemail">Email</label>
          <input 
            className="input-form" 
            id="iemail" 
            type="email" 
            placeholder="Digite seu Email"
            {...register("email")}
          />
        
          <label className="label-form" htmlFor="text">Assunto</label>
          <textarea 
            className="p-2 border outline-emerald-500 rounded-md" 
            id="text" 
            placeholder="Digite aqui sua duvida" 
            rows={6}
            {...register("text")}
          />
          
          <button className="button mt-4">{loading ? "Enviando..." : "Enviar"}</button>
        </form>
        <Image width={400} height={400} src="/images/contactus.svg" alt="imagem de telefone para contato" className="max-lg:hidden"/>
      </div>
    </section>
  )
}