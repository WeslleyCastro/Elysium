![Badge](https://img.shields.io/badge/STATUS-DESENVOLVIMENTO-orange)

# 📖 Elysium
  Compartilhe e descubra novos livros. Veja as avaliações e comentarios do livro que esta interessado!

## <a href="https://elysium-books.vercel.app">Acesse o site</a>

<img src="https://github.com/WeslleyCastro/Elysium/assets/117310795/cb7ec9be-f77d-440d-a3dc-677c475500d9" alt="Página inical do site Elysium" width="700">


## 🖥️ Algumas das tecnologias utilizadas

- MongoDB e Mongoose
- Next
- NextAuth
- SWR
- Swiper
- Radix UI (modal)
- bcryptjs
- React-hook-form
- React-toastify
- Tailwind
- Typescript
- javaScript

## Requesições GET e POST

  Para realizar o registro dos livros do usuario segue o schema <b>books</b> simplificado:

  ```typescript
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    title: String,
    categorie?: String,
    author: String,
    price?: Number, 
    number_pages?: Number,
    description: String,
    image: String,
    rating?: Number,
    creator_rating: Number
  }
  ```
  O <b>creator</b> esta referenciando o schema de usuario chamado <b>users</b> simplificado:

  ```typescript
  {
    email: String,
    username: String,
    password: String,
    description: String,
    image?: String,
  }
  ```

  Quando é feito a requisição GET com o método populate do mongoose, a requisição retorna os dados do schema <b>books</b> e o creator com os dados do usuario que compartilhou o livro seguindo o schema <b>users</b>.

  No registro do livro para ser compartilhado na página <b>/share</b>, a imagem do livro selecionada passa por uma função chamada <b>imageToBase64</b> que recebe a imagem, e através do Event converte para base64 para ser enviado para o banco de dados. Segue a função citada:

  ```typescript
    export const imageToBase64 = async(e: ChangeEvent<HTMLInputElement>) => {
      const imageConvert = await convertToBase64(e.target.files![0])
      return imageConvert
    }
  
    const convertToBase64 = (file: Blob) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
          resolve(fileReader.result)
        }
        fileReader.onerror = (error) => {
          reject(error)
        }
      })
    }
  ```
  Após converter a imagem, segue o envio para o banco de dados através do route handler, que recebe os dados passado no body da requisição e é enviado para o bando de dados. No momento que a requisição é enviada, por conta do ``` export const dynamic = 'force-dynamic' ``` que contem onde esta sendo feito a requisição GET de todos os livros, os dados serão atualizados novamente, assim retornando os livros atualizados na página principal. 

  

  
  

  
