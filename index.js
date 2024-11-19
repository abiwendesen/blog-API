import express from "express";
import authRoutes from "./route/auth.js";
import postRoutes from "./route/post.js";
import userRoutes from "./route/user.js";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import {dirname} from "path"
import cookieParser from "cookie-parser";

const app = express();


let accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{ flags: 'a'})
app.use(morgan("combined",{stream: accessLogStream}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/post",postRoutes);
app.use("/api/user",userRoutes);
app.listen(5000, ()=>{
    console.log("connected");

});
