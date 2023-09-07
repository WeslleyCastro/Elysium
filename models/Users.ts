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

const UserModel = models.users || model("users", UserSchema)

export { UserModel }  