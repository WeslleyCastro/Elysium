import UserModel from "@/models/User"
import { connectToDB } from "@/utils/database"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest){

  const userId = req.nextUrl.searchParams.get("id")

  console.log(userId)
  try {
    connectToDB()

    const getUser = await UserModel.findById(userId)

    if(!getUser) return new Response("no user found", { 
      status: 404 
    })

    return new Response(JSON.stringify(getUser), {
      status: 200
    })
  } catch (error) {
    return new Response(JSON.stringify("failed to get user"), {
      status: 500
    })
  }
}

export const PATCH = async(req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get("id")


  const {description: updatedDescription} = await req.json()
  try {
    connectToDB()

    const getUser = await UserModel.findOneAndUpdate({_id: userId}, {description: updatedDescription}, { new: true })

    if(!getUser) return new Response("no user found", { 
      status: 404 
    })

    return new Response(JSON.stringify(getUser), {
      status: 200
    })
  } catch (error) {
    return new Response(JSON.stringify("failed to get user"), {
      status: 500
    })
  }
}