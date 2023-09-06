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
  const urlUsers = `${process.env.BASEURL}/api/users?id=${searchParams.id}`
  const urlCreator = `${process.env.BASEURL}/api/books/search/bycreator/${searchParams.id}`

  const [userDataResponse, userBooksDataResponse] = await Promise.all([
    fetch(urlUsers, { cache: "no-store"}),
    fetch(urlCreator, {cache: "no-store"})
  ])
  
  const user: IUser = await userDataResponse.json()
  const userBooks: BookCardProps[] = await userBooksDataResponse.json()


  return(
    <section>
      <ProfileHeader
        _id={user._id}
        userName={user.username}
        userImage={user.image}
        userDescription={user.description}
      />
      <section className="mt-36">
        {userBooks.length > 0 ? (
          <>
            <h2 className="pl-20 text-xl font-semibold">Livros compartilhados <span className="text-sm italic text-zinc-500">[{userBooks.length}]</span></h2>
            <BookCarrousel books={userBooks}/>
          </>
        ):(
          <span className="pl-20 text-xl font-semibold">Nenhum livro compartilhado</span>
        )}
      </section>
    </section>
  )
}
