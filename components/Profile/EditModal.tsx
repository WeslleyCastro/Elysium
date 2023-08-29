"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { AiFillEdit } from "react-icons/ai"

interface EditDescription{
  description: string
}


export const EditModal = ({userId}: {userId: string}) => {
  const [open, setOpen] = useState(false)

  const {register, handleSubmit} = useForm<EditDescription>()

  const onSubmit = async (data: EditDescription) => {
    try {
      await fetch(`/api/users?id=${userId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      })
    } catch (error) {
      console.log(error)
    }
    finally{
      setOpen(false)
    }
  }

  return(
    <Dialog.Root open={open} onOpenChange={setOpen}>
    <Dialog.Trigger asChild>
      <AiFillEdit size={20} className="cursor-pointer absolute -right-8 -top-0.5"/>
    </Dialog.Trigger>  
    <Dialog.Portal>
      <Dialog.Overlay className="fixed w-screen h-screen inset-0 bg-black opacity-80"/>    {/* Fundo preto */}

      <Dialog.Content className="center-modal w-full sm:w-[500px] border rounded-lg bg-white px-4 py-8">
      
        <Dialog.Title className="font-semibold text-lg text-emerald-500 mb-8">
          Editar Descrição
        </Dialog.Title>  

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
         
          <textarea
            className="border rounded-md mb-6 min-h-[100px] p-2 outline-emerald-500"
            placeholder="Escreva sua descrição" 
          
            {...register("description")}
          />
          
          <div className="flex gap-2 justify-end">
            <Dialog.Close asChild>
              <button type="button" className="rounded-lg font-semibold bg-red-500 text-white w-24">Cancelar</button>
            </Dialog.Close>
              <button type="submit" className="button w-24">Editar</button>
          </div>
        </form>                  
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
  )
}