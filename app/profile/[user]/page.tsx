import { ProfileHeader } from "@/components/Profile/ProfileHeader"
import { BookCardProps } from "@/@types/bookCardProps"
import { BookCarrousel } from "@/components/BookCarousel"
import { IUser } from "@/models/User"

interface ProfileProps {
  searchParams: {
    id: string
  }
}

export default async function Profile({searchParams}: ProfileProps){

  const [userDataResponse, userBooksDataResponse] = await Promise.all([
    fetch(`http://localhost:3000/api/users?id=${searchParams.id}`, { cache: "no-store"}),
    fetch(`http://localhost:3000/api/books/search/bycreator/${searchParams.id}`, {cache: "no-store"})
  ])
  
  const user: IUser = await userDataResponse.json()
  const userBooks: BookCardProps[] = await userBooksDataResponse.json()


  return(
    <section className="p-6">
      <ProfileHeader
        _id={user._id}
        userName={user.username}
        userImage={user.image}
        userDescription={user.description}
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
