import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.MONGO_URI)
const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("db connected")
    }).catch(err => {
        console.log("db not connected" , err)

    })
}

export default connectDB;