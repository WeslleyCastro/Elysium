import Users from "@/models/User";
import { connectToDB } from "@/utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_PUBLIC_KEY ?? "",
      clientSecret: process.env.GOOGLE_SECRET_KEY ?? ""
    })
  ],
  pages: {
    signIn: "/signin"
  },
  callbacks: {
    async signIn({ profile }){
      try {
        await connectToDB()

        const userExists = await Users.findOne({
          email: profile?.email
        })
        if(!userExists){
          await Users.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            image: profile?.picture
          })
        }
        return true
        
      } catch (error) {
        console.log(error)
        return false
      }
    },
    
    async session({ session }){
      const sessionUser = await Users.findOne({
        email: session?.user?.email
      })
      session.user.id = sessionUser?._id.toString()

      return session
    }
  }
})

export { handler as GET, handler as POST}