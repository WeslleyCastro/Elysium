import { Schema, model, models } from "mongoose"

export interface IUser {
  _id: string,
  email: {
    type: string,
    unique: string | boolean,
  },
  username: string,
  password: string,
  image?: string,
  description?: string,
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: [true, "Email já existente"],
  },
  username: {
    type: String,
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Usuario invalido, deve conter 8-20 caracteres"]
  },
  password: {
    type: String,
  },
  description:{
    type: String,
  },
  image: {
    type: String,
  },
}) 

const User = models.User || model("User", UserSchema)

export default User