"use client"

import * as AlertDialog from "@radix-ui/react-alert-dialog"
import { AiFillDelete } from "react-icons/ai"
import { deleteComment } from "@/services/swr"
import { useSWRConfig } from "swr"


export const DeleteModal = ({bookId, commentId}: {bookId: string, commentId: string}) => {
  const { mutate } = useSWRConfig()

  const handleDeleteComment = async() => {
    await deleteComment(bookId, commentId)
    mutate(`/api/books/${bookId}/comments`)
  }

  return(
    <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <button><AiFillDelete size={16}/></button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="fixed w-screen h-screen inset-0 bg-black opacity-30 z-50"/>
      <AlertDialog.Content className="center-modal w-full sm:w-[600px] rounded-md bg-white px-4 py-4 z-50">
        <AlertDialog.Title className="font-semibold text-lg text-emerald-500 mb-4" >
          Excluir Comentario?
        </AlertDialog.Title>
        <AlertDialog.Description className="mb-5">
          Esta ação não pode ser desfeita, e o comentario será removido!  
        </AlertDialog.Description> 
        <div className="flex gap-4 justify-end">
          <AlertDialog.Cancel className="py-2 px-4 border rounded-md transition hover:brightness-75">
            Cancelar
          </AlertDialog.Cancel>
          <AlertDialog.Action className="py-2 px-4 font-medium text-white transition hover:brightness-75 bg-red-500 rounded-md">
            <button onClick={handleDeleteComment}>Deletar Comentario</button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
)
}