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
        res.json({
            message:"Sorry! Some error occured"
        });
    }
})

todoRouter.delete("/deletetodo",async(req,res)=>{
    try{
    const todoID = req.body.todoID;
    const response = await todoModel.findOneAndDelete({
        _id:todoID
    });
    res.json({
        message:"Delete Succesful!"
    })
    }catch(err){
        res.json({
            message:"Sorry! Some error occured"
        })
    }
})

todoRouter.post("/updatetodo",async(req,res)=>{
    const todoID = req.body.todoID;
    const update = req.body.update;
    const response = await todoModel.findByIdAndUpdate({
        _id:todoID
    },{
        description:update
    },
    {
        new: true,
      })
    res.json(response);
})

export default todoRouter;