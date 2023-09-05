import express from "express"
import bcrypt from "bcrypt";
import { userModel } from "../MongoModels/userModel.js";
import {todoModel} from "../MongoModels/toDo.js";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

userRouter.post("/register",async(req,res)=>{
    const {username,password} = req.body;
    const user = await userModel.findOne({username});
    if(user){
        return res.json({
            message:"User Already Exists!"
        })
    }
    const datenow = new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'});
    const hashPassword = await bcrypt.hash(password,10);
    const newUser = new userModel({username,password:hashPassword,createdAt:datenow});
    await newUser.save();
    res.json({
        message:"User Succesfully Registered!!"
    })
})

userRouter.post("/login",async(req,res)=>{
    const {username,password} = req.body;
    const user = await userModel.findOne({username});
    if(!user){
        return res.json({
            message:"User Not Found!!"
        })
    }
    const intermediate = await bcrypt.compare(password,user.password);
    if(user.username === "ankushshenoy123@gmail.com" && intermediate){
        const adminToken = jwt.sign({username:user.username},process.env.SECRET,{
            expiresIn : process.env.JWT_EXPIRES_IN,
        });
        return res.json({
            userID:user._id,
            adminToken,
            message:"Login Succesfull! Welcome Admin",
        })
    }
    if(intermediate){
        const token = jwt.sign({username:user.username},process.env.SECRET,{
            expiresIn : process.env.JWT_EXPIRES_IN,
        });
        res.json({
            userID:user._id,
            token,
            message:"Login Succesfull!",
        })
    }else{
        return res.json({
            message:"Invalid Credentials!"
        })
    }
})

userRouter.get("/getAllUsers",async(req,res)=>{
    const data = await userModel.find();
    const users = data.filter(elem => elem.username !== "ankushshenoy123@gmail.com")
    const response = users.map(r=>{
        return{
            username : r.username,
            createdOn : r.createdAt,
            userID : r._id,
        }
    })
    res.send(response);
})

userRouter.delete("/deleteuser",async(req,res)=>{
    const {userID} = req.body;
    await userModel.findByIdAndDelete(userID);
    await todoModel.deleteMany({
        owner : userID
    })
    console.log("deleted");
    res.json({
        message:"Deleted Succesfully"
    })
})



export default userRouter;