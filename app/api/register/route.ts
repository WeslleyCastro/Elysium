import UserModel from "@/models/User";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { ProfileImageBase64 } from "@/public/images/ProfileImageBase64";

import bcrypt from "bcryptjs";


export const POST = async(req: Request, res: NextResponse) => {
  const { email, username, password } = await req.json()
  
  try {
    await connectToDB()

    const userExist = await UserModel.findOne({ email: email })
    
    
    if(userExist) {
      return NextResponse.json({error: "Email já cadastrado", type: "email"}, {status: 400})
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({
      email,
      username,
      password: hashPassword,
      image: ProfileImageBase64
    })

    await newUser.save()

    return NextResponse.json({
      status: 201,
      message: "Usuario criado com sucesso"
    })
  } catch (error: any) {
    return NextResponse.json({
      status: error.status || 500,
      message: error.message,
      type: error.type || "server"
    })
  }
}