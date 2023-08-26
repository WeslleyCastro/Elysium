import User from "@/models/User"
import { connectToDB } from "@/utils/database"

interface requestParams{
  params: {
    name: string
  }
}
export async function GET(req: Request, params: requestParams){

  const getName = params.params.name

  try {
    connectToDB()

    const getUser = await User.find({username: getName})

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