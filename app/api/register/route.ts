import User from "@/models/User";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { ProfileImageBase64 } from "@/public/images/ProfileImageBase64";

import bcrypt from "bcryptjs";

export const POST = async(req: Request) => {
  const { email, username, password } = await req.json()

  try {
    connectToDB()

    const userExist = await User.findOne({ email })

    if(userExist) {
      return NextResponse.json({
        status: 404,
        message: "User already exist"
      })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      email,
      username,
      password: hashPassword,
      image: ProfileImageBase64
    })

    await newUser.save()

    return NextResponse.json({
      status: 201,
      message: "User created successfully"
    })
  } catch (error) {
    NextResponse.json({
      status: 500,
      message: "Internal server error"
    })
  }
}