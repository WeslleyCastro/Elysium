interface ProfileHeaderProps {
  userName?: string
  userImage?: string
  userDescription?: string
}

export const ProfileHeader = ({userName, userImage, userDescription}: ProfileHeaderProps ) => {


  const profileImage = userImage ? userImage : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
  
  return(
    <div className="flex items-center gap-8">
      <img
        className="rounded-full w-28 outline outline-4 outline-emerald-500"
        src={profileImage}
        alt=""
      />
      <div>
        <h1 className="font-semibold text-2xl">
          {userName}
        </h1>
        <span className="italic text-gray-400">{userDescription ? userDescription : "Description"}</span>
      </div>
    </div>
  )
}