import { ProfileHeader } from "@/components/Profile/ProfileHeader"
import { BookCardProps } from "@/@types/bookCardProps"
import { BookCarrousel } from "@/components/BookCarrousel"

interface ProfileProps {
  searchParams: {
    user: string
  }
}

export default async function Profile({searchParams}: ProfileProps){
  const response = await fetch(`http://localhost:3000/api/profile?user=${searchParams.user}`, {cache: "no-store"})
  const data: BookCardProps[] = await response.json()

  const { creator } = data[0]
  console.log(creator)
  return(
    <section className="p-4">
      <ProfileHeader 
        userName={creator!.username}
        userImage={creator!.image}
        
      />
      
      <section className="mt-24">
        <span className="pl-20 text-xl font-semibold">Livros compartilhados</span>
        <BookCarrousel books={data}/>
      </section>
    </section>
  )
}