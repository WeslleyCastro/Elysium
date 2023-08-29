"use client"

import { useSession } from "next-auth/react"
import { EditModal } from "./EditModal"

interface ProfileHeaderProps {
  userName: string
  userImage?: string
  userDescription?: string
  _id: string
}

export const ProfileHeader = ({userName, userImage, userDescription, _id}: ProfileHeaderProps ) => {
  const {data: session} = useSession()


  let description = userDescription ? userDescription : "Sem descrição"
  
  let profileImage = userImage ? userImage : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
  
  return(
    <div className="flex items-center gap-8">
      <img
        className="rounded-full w-28 outline outline-4 outline-emerald-500"
        src={profileImage}
        alt="imagem de perfil"
      />
      <div>
        <h1 className="font-semibold text-2xl ">
          {userName}
        </h1>
        <p className="italic text-gray-400 relative gap-2 sm:max-w-[500px]">
          {description} {session?.user.id === _id ? 
           <EditModal userId={_id}/> : ""}
        </p>
      </div>
    </div>
  )
}