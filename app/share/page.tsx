"use client"

import Image from "next/image"
import { ChangeEvent, useState } from "react"
import { useForm } from "react-hook-form"
import { useSession } from "next-auth/react"

interface BookForm{
  bookCategorie: String,
  bookDescription:String,
  bookTitle: String,
  bookAuthor: String,
  bookNumberPage: Number,
  bookPrice: Number,
  bookImage: String
}


export default function Share(){
  const { register, handleSubmit} = useForm<BookForm>() 
  const [image64, setImage64] = useState("")
  const { data: session } = useSession()
  
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

  const onSubmit = async(data: BookForm) => {  
    try {
      const response = await fetch("/api/createbook",{
        method: "POST",
        body: JSON.stringify({
          title: data.bookTitle,
          description: data.bookDescription,
          price: data.bookPrice,
          author: data.bookAuthor,
          number_page: data.bookNumberPage,
          categorie: data.bookCategorie,
          image: image64,
          createby: session?.user?.id
        })
      })
    } catch (error) {
      console.log(error)
    }
  } 

  return(
    <section className="w-full flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row justify-evenly w-full p-4 mt-16">
        
      <div className="p-2 h-[450px]">
        <div className="rounded-md h-full mb-3 flex items-center justify-center">
          {image64 && <Image src={image64} width={350} height={350} alt=""/>}
        </div>
            
          <label className="my-3" htmlFor="">Selecione a imagem do Livro</label><br/>
          
          <input
            required
            onChange={handleChangeImage}
            type="file" 
            accept="image/*"
          />
      </div>

        <div className="flex flex-col lg:w-1/3 mt-20 lg-mt-0">       
          <label className="mt-3 mb-2" htmlFor="bookTitle">Título</label>
          <input
            required
            className="border rounded-md p-2 outline-emerald-500"
            type="text"
            placeholder="Digite o nome do livro"
            id="bookTitle"
            {...register("bookTitle")}
          />

          <label className="mt-3 mb-2" htmlFor="bookCategorie">Categoria</label>
          <input
            className="border rounded-md p-2 outline-emerald-500"
            type="text"
            placeholder="Categoria"
            id="bookCategorie"
            {...register("bookCategorie")}
          />

          <label className="mt-3 mb-2" htmlFor="bookDescription">Descrição</label>
          <textarea
            required
            className="p-2 border outline-emerald-500"
            cols={30} rows={3}
            placeholder="Fale o que achou"
            id="bookDescription"
            {...register("bookDescription")}
          />

          <label className="mt-3 mb-2" htmlFor="bookAuthor">Autor</label>
          <input
            required
            className="border rounded-md p-2 outline-emerald-500"
            type="text"
            placeholder="Nome do autor"
            id="bookAuthor"
            {...register("bookAuthor")}
          />

          <label className="mt-3 mb-2" htmlFor="bookNumberPage">Número de Páginas</label>
          <input
            className="border rounded-md p-2 outline-emerald-500"
            type="Number"
            placeholder="Número de páginas"
            id="bookNumberPage"
            {...register("bookNumberPage")}
          />

          <label className="mt-3 mb-2" htmlFor="bookPrice">Price</label>
          <input
            required
            className="border rounded-md p-2 outline-emerald-500"
            type="Number"
            placeholder="Valor do livro"
            id="bookPrice"
            {...register("bookPrice")}
          />

          <button
            type="submit"
            className="bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg my-4"
          >
            Publicar
          </button>
          
        </div>
      </form>
    </section>
  )
}