
interface ProfileHeaderProps {
  userName?: string
  userImage?: string
  userDescription?: string
}

export const ProfileHeader = ({userName, userImage, userDescription}: ProfileHeaderProps ) => {
  return(
    <div className="flex items-center gap-8">
      <img
        className="rounded-full w-28 outline outline-4 outline-emerald-500"
        src={userImage}
        alt=""
      />
      <div>
        <h1 className="font-semibold text-2xl">
          {userName}
        </h1>
        <span className="italic text-gray-400">Descrição do usuario</span>
      </div>
    </div>
  )
}