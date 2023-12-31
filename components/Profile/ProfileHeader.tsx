"use client"

import { EditModal } from "./EditModal"
import { useSession } from "next-auth/react"

interface ProfileHeaderProps {
  userName: string
  userImage?: string
  userDescription?: string
  _id: string
}

export const ProfileHeader = ({userName, userImage, userDescription, _id}: ProfileHeaderProps ) => {
  const {data: session} = useSession()
  let description = userDescription ? userDescription : "Sem descrição"

  
  return(
    <div className="flex items-center gap-8 pl-8 pt-8 sm:pl-16">
      <img
        className="rounded-full w-28 outline outline-4 outline-emerald-500 h-28"
        src={userImage!}
        alt="imagem de perfil"
      />
      <div>
        <h1 className="font-semibold text-2xl">
          {userName}
        </h1>
        <p className="italic text-gray-400 relative gap-2 sm:max-w-[500px]">
          {description} {session?.user.id === _id ? <EditModal userId={_id}/> : ""}
        </p>
      </div>
    </div>
  )
}