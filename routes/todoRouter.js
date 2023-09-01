import express from "express";
import { todoModel } from "../MongoModels/toDo.js";

const todoRouter = express.Router();

todoRouter.post("/addtodo",async(req,res)=>{
    try{
        const todo = new todoModel(req.body)
        await todo.save();
        res.json({
            message:"Added sucessfully!"
        });
    }catch(err){
        console.error(err);
        res.json({
            message:"Sorry! Some error occured"
        });
    }
})

todoRouter.get("/gettodos",async(req,res)=>{
    try{
        const userID = req.query.userID;
        const response = await todoModel.find({owner:userID})
        res.json(response);
    }catch(err){
        console.error(err);
        res.json({
            message:"Sorry! Some error occured"
        });
    }
})

export default todoRouter;