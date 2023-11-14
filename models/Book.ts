import { Schema, model, models } from "mongoose";
import { IUser } from "@/models/Users"


export interface BookInterface {
  creator: IUser;
  title: string;
  categorie?: string;
  author: string;
  price?: number;
  number_pages?: number;
  description: string;
  image: string;
  rating?: number;
  creator_rating: number
}


const BookSchema = new Schema<BookInterface>({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  title: {
    type: String,
    required: [true, "Titulo é obrigatorio"]
  },
  categorie: {
    type: String,
  },
  author: {
    type: String,
    required: [true, "Autor é obrigatorio"]
  },
  price: {
    type: Number,
  },
  number_pages: {
    type: Number,
  },
  description: {
    type: String,
    required: [true, "Valor é obrigatorio"]
  },
  image: {
    type: String,
    required: [true, "Imagem é obrigatoria"]
  },
  rating: {
    type: Number,
  },
  creator_rating: {
    type: Number,
    required: true
  }
})

const Book = models.books || model("books", BookSchema)

export { Book }