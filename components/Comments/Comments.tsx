import { CommentInterface } from "@/models/Comment"
import { CommentTextArea } from "./CommentTextArea"
import { StarsRating } from "../StarsRating"

export interface CommentsProps {
  bookId: string,
  userComments?: CommentInterface[]
}

export const Comments = ({ bookId, userComments}: CommentsProps) => {
  return (
    <div>
      <h2 className="font-medium text-xl">Comentarios</h2>
      
      <CommentTextArea bookId={bookId}/>

      <div className="mt-8 flex flex-col justify-center sm:justify-start sm:max-w-[500px] gap-6">
        {userComments && userComments.map((comments: CommentInterface) => (
          <div key={comments._id as string} className="border p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <img className="rounded-full" src={comments.creator.image} alt="imagem do usuario" width={30} height={30}/>
              <span className="text-sm">{comments.creator.username}</span>
            </div>
            <StarsRating rating={comments.commentRating} size={15}/>
            <p className="text-sm mt-4">{comments.comment}</p>
          </div>
          ))}
      </div>
    </div>
  )
}