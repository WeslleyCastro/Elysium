import { Schema, model, models } from "mongoose"

export interface IUser {
  email: {
    type: string,
    unique: string | boolean,
  },
  username: string,
  image?: string,
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: [true, "Email já existente"],
    required: [true, "Email é obrigatorio"]
  },
  username: {
    type: String,
    required: [true, "Usuario é obrigatorio"],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Usuario invalido, deve conter 8-20 caracteres"]
  },
  image: {
    type: String,
  },
}) 

const User = models.User || model("User", UserSchema)

export default User