"use client"

import Image from "next/image"
import { ChangeEvent, useState } from "react"
import { useForm } from "react-hook-form"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { BookInterface } from "@/models/Book"
import { StarsRating } from "@/components/StarsRating"

export default function Share(){
  const { register, handleSubmit, reset} = useForm<BookInterface>() 
  const [insertRating, setInsertRating] = useState(0)
  const [image64, setImage64] = useState("")
  const { data: session } = useSession()
  const router = useRouter()
  
  const handleChangeImage = async(e: ChangeEvent<HTMLInputElement>) => {
    const imageConvert = await convertToBase64(e.target.files![0])
    setImage64(imageConvert as string)
  }

  const convertToBase64 = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const onSubmit = async(data: BookInterface  ) => {  
    try {
      const response = await fetch("/api/books/newbook",{
        method: "POST",
        body: JSON.stringify({
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
      })
      
    } catch (error) {
      console.log(error)
    } finally {
      reset()
      router.push("/")
    }
  } 

  return(
    <section className="w-full flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row justify-evenly w-full p-4 mt-16">
      
      {/* Form select image */}
      <div className="p-2 flex flex-col justify-center gap-2">
          {image64 && (
            <Image 
              src={image64} 
              width={350} 
              height={350} 
              alt="Imagem do livro selecionado"
            />
          )}

          <label className="font-medium" htmlFor="userImage">
            Selecione a imagem do Livro
          </label>

          <input
            className="file:rounded-xl file:py-2 file:bg-emerald-500 file:text-white file:font-bold file:px-4 file:transition file:border-none file:hover:bg-emerald-600"
            required
            onChange={handleChangeImage}
            type="file" 
            accept="image/*"
            id="userImage"
          />
      </div>

        {/* Form informations */}
        <div className="flex flex-col lg:w-1/3 mt-20 lg-mt-0">       
          <label className="label-form" htmlFor="title">Título</label>
          <input
            required
            className="input-form"
            type="text"
            placeholder="Digite o nome do livro"
            id="title"
            {...register("title")}
          />

          <label className="label-form" htmlFor="categorie">Categoria</label>
          <input
            className="input-form"
            type="text"
            placeholder="Categoria"
            id="categorie"
            {...register("categorie")}
          />

          <label className="label-form" htmlFor="description">Descrição</label>
          <textarea
            required
            className="p-2 border outline-emerald-500"
            cols={30} rows={3}
            placeholder="Descrição do livro"
            id="description"
            {...register("description")}
          />

          <label className="label-form" htmlFor="author">Autor</label>
          <input
            required
            className="input-form"
            type="text"
            placeholder="Nome do autor"
            id="author"
            {...register("author")}
          />

          <label className="label-form" htmlFor="number_pages">Número de Páginas</label>
          <input
            className="input-form"
            type="Number"
            placeholder="Número de páginas"
            id="number_pages"
            {...register("number_pages")}
          />

          <label className="label-form" htmlFor="price">Price</label>
          <input
            required
            className="input-form"
            type="Number"
            placeholder="Valor do livro"
            id="price"
            {...register("price")}
          />

          <label className="label-form">Avaliação</label>
          <StarsRating size={20} insert={setInsertRating} weigth={insertRating} />

          <button
            type="submit"
            className="bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg my-4">
            Publicar
          </button>
          
        </div>
      </form>
    </section>
  )
}