import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import todoRouter from "./routes/todoRouter.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

mongoose.connect(`mongodb+srv://ankushshenoy123:${process.env.PASSWORD}@things-to-d-db.iyrerfs.mongodb.net/Things-To-D-Db?retryWrites=true&w=majority`);
app.use("/auth",userRouter);
app.use("/todos",todoRouter);



app.listen(process.env.PORT,()=>{
    console.log("Server Started");
})

export default app;