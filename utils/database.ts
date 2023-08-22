import mongoose from "mongoose"

let isConnect = false

export const connectToDB = async() => {
  mongoose.set("strictQuery", true)
  
  let URI = process.env.URI_MONGODB ?? ""
  let config ={
    dbName: "elysium",
    useUnifiedTopology: true,
  }

  if(isConnect){
    console.log("MongoDB is already connected")
    return
  }

  try {
    await mongoose.connect(URI, config)
    isConnect = true
    console.log("MongoDB connected")
  } catch (error) {
    console.log(error)
  }
}