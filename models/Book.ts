import { Schema, model, models } from "mongoose";

const BookSchema = new Schema({
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
    required: [true, "Valor é obrigatorio"]
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
  createdby: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
})


const Book = models.books || model("books", BookSchema)

export { Book, BookSchema }