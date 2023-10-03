import { Schema, model, models } from "mongoose";
import { IUser } from "./Users";

export interface CommentInterface {
  _id?: string;
  comment: string;
  creator: IUser;
  createdAt: string;
  commentRating: number
  commentForbook: Schema.Types.ObjectId | string;
}


const CommentSchema = new Schema({
  commentForBook: {
    type: Schema.Types.ObjectId,
  },
  comment: {
   type: String,
   required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  createdAt: {
    type: Date,
  },
  commentRating:{
    type: Number,
    required: true,
  },
})

const comment = models.comments || model("comments", CommentSchema);

export default comment