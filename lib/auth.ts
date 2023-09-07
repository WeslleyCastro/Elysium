import { UserModel } from "@/models/Users";
import { connectToDB } from "@/utils/database";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { User } from "next-auth";
import { Session } from "next-auth";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_PUBLIC_KEY ?? "",
      clientSecret: process.env.GOOGLE_SECRET_KEY ?? ""
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials, req){
        const { email, password } = credentials as {email: string, password: string}

        try {
          await connectToDB()
          
          const user = await UserModel.findOne({ email })
        
          if (!user){
            return {error: "user404"}
          }

          const passwordMatch = await bcrypt.compare(password, user.password)
          
          if (!passwordMatch){
            return {error: "password"}
          }

          return user
        } catch (error) {
          console.log(error)
        }
      }
    })
  ],
  pages: {
    signIn: "/signin"
  },
  callbacks: {
    async signIn({ user }: {user: User}){
      
      if(user.error == "user404"){
        throw new Error("Usuário não encontrado")
      }else if(user.error == "password"){
        throw new Error("Senha incorreta")
      }

      try {
        await connectToDB()

        const userExists = await UserModel.findOne({
          email: user?.email
        })

        if(!userExists){
          await UserModel.create({
            email: user?.email,
            username: user?.name,
            image: user?.image
          })
        }
        return true
        
      } catch (error) {
        console.log(error)
        return false
      }
    },

    async session({ session }: {session: Session}){
      const sessionUser = await UserModel.findOne({
        email: session?.user?.email
      })
      session.user.id = sessionUser?._id.toString()
      session.user.name = sessionUser?.username

      return session
    }
  }
}