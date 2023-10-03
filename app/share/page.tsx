"use client"

import Image from "next/image"
import { ChangeEvent, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { BookInterface } from "@/models/Book"
import { StarsRating } from "@/components/StarsRating"
import { imageToBase64 } from "@/utils/convertToBase64"
import { toast } from "react-toastify"
import axios from "axios"

const requiredStar = <span className="text-red-500">*</span>

export default function Share(){
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors }
  } = useForm<BookInterface>() 
  const [insertRating, setInsertRating] = useState(0)
  const [image64, setImage64] = useState("")
  const { data: session } = useSession()
  const router = useRouter()
  
  const handleChangeImage = async(e: ChangeEvent<HTMLInputElement>) => {
    await imageToBase64(e)
      .then((response) => {
        setImage64(response as string)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onSubmit = async(data: BookInterface) => {  
    try {
      await axios.post("/api/books/newbook",{
        title: data.title,
        description: data.description,
        price: data.price,
        author: data.author,
        number_pages: data.number_pages,
        categorie: data.categorie,
        image: image64,
        createdby: session?.user?.id,
        creator_rating: insertRating
      })

      toast.success("Livro publicado com sucesso")
      router.push("/")
    } catch (error) {
      toast.error("Erro ao publicar livro")
      console.log(error)
    } finally {
      reset()
    }
  } 

  return(
    <section className="w-full flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row justify-evenly w-full p-4 mt-16 ">
      
      {/* Form select image */}
      <div className="p-2 flex flex-col justify-center gap-2">
        {image64 && (
          <Image 
            src={image64} 
            width={350} 
            height={350} 
            alt="Imagem do livro selecionado"
            className="object-cover max-h-[500px]"
          />
        )}

        <label className="font-medium" htmlFor="userImage">
          Selecione a imagem do Livro
        </label>
        <input
          className="file:rounded-xl file:py-2 file:bg-emerald-500 file:text-white file:font-bold file:px-4 file:transition file:border-none file:hover:bg-emerald-600"
          onChange={handleChangeImage}
          type="file" 
          accept="image/*"
          id="userImage"
        />
      </div>

      {/* Form informations */}
      <div className="flex flex-col lg:w-1/3 mt-20 lg-mt-0">       
        <label className="label-form" htmlFor="title">Título {requiredStar}</label>
        <input
          type="text"
          className="input-form"
          placeholder="Título do livro"
          {...register("title", { required: true })}
          aria-invalid={errors.title ? "true" : "false"}
        />
        {errors.title && (
          <p className="alert-form" role="alert">Campo obrigatório</p>
        )}

        <label className="label-form" htmlFor="categorie">Categoria {requiredStar}</label>
        <input
          className="input-form"
          type="text"
          placeholder="Categoria"
          id="categorie"
          {...register("categorie", { required: true })}
          aria-invalid={errors.categorie ? "true" : "false"}
        />
        {errors.categorie && (
          <p className="alert-form" role="alert">Campo obrigatório</p>
        )}

        <label className="label-form" htmlFor="description">Descrição {requiredStar}</label>
        <textarea
          className="p-2 border outline-emerald-500"
          cols={30} rows={3}
          placeholder="Descrição do livro"
          id="description"
          {...register("description", { required: true })}
          maxLength={939}
        />
        {errors.description && (
          <p className="alert-form" role="alert">Campo obrigatório</p>
        )}

        <label className="label-form" htmlFor="author">Autor {requiredStar}</label>
        <input
          className="input-form"
          type="text"
          placeholder="Nome do autor"
          id="author"
          {...register("author", { required: true })}
        />
        {errors.author && (
          <p className="alert-form" role="alert">Campo obrigatório</p>
        )}
        
        <label className="label-form" htmlFor="number_pages">Número de Páginas</label>
        <input
          className="input-form"
          type="Number"
          placeholder="Número de páginas"
          id="number_pages"
          min={1}
          {...register("number_pages")}
        />
        
        <label className="label-form" htmlFor="price">Price {requiredStar}</label>
        <input
          className="input-form"
          type="Number"
          placeholder="Valor do livro"
          id="price"
          min={1}
          {...register("price", {required: true})}
        />
        {errors.price && (
          <p className="alert-form" role="alert">Campo obrigatório</p>
        )}

        <label className="label-form">Avaliação</label>
        <StarsRating size={20} insert={setInsertRating} weigth={insertRating} />
          <button
            type="submit"
            className="button my-4">
            Publicar
          </button>
      </div>
    </form>
  </section>
  )
}