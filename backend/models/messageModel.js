import mongoose from "mongoose";

const messageModel = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.Int32,
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.Int32,
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true});

export const Message = mongoose.model("Message", messageModel);