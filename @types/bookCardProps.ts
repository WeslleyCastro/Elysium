import { IUser } from "@/models/Users";

export interface BookCardProps {
  _id: string,
  title: string, 
  image: string,
  rating: number,
  author: string,
  creator_rating: number,
  creator?: IUser
}