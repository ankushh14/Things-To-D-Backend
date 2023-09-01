import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    description:{type:String,required:true},
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
})

export const todoModel = mongoose.model("todo",todoSchema);