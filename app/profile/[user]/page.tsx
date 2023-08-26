import { ProfileHeader } from "@/components/Profile/ProfileHeader"
import { BookCardProps } from "@/@types/bookCardProps"
import { BookCarrousel } from "@/components/BookCarousel"
import { IUser } from "@/models/User"

interface ProfileProps {
  params: {
    user: string
  }
}

export default async function Profile({params}: ProfileProps){
  const [userDataResponse, userBooksDataResponse] = await Promise.all([
     fetch(`http://localhost:3000/api/users/${params.user}`, {cache: "no-store"}),
     fetch(`http://localhost:3000/api/books/search/bycreator/${params.user}`, {cache: "no-store"})
  ])
  
  const userData: IUser = await userDataResponse.json()
  const userBooks: BookCardProps[] = await userBooksDataResponse.json()

  return(
    <section className="p-4">
      <ProfileHeader 
        userName={userData.username}
        userImage={userData.image}
        userDescription={userData.description}
      />
      <section className="mt-24">
        
        {userBooks.length > 0 ? (
          <>
            <span className="pl-20 text-xl font-semibold">Livros compartilhados</span>
            <BookCarrousel books={userBooks}/>
          </>
        ):(
          <span className="pl-20 text-xl font-semibold">Nenhum livro compartilhado</span>
        )}
      </section>
    </section>
  )
}