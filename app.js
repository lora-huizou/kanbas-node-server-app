//const express = require('express');
import "dotenv/config";
import session from "express-session";
import express from "express";
import HelloRoutes from "./hello.js"; 
import Lab5 from "./Lab5.js";
import cors from "cors";
import mongoose from "mongoose";
//mongoose.connect("mongodb://127.0.0.1:27017/kanbas");

mongoose.connect("mongodb://127.0.0.1:27017/kanbas", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // 设置服务器选择超时时间（毫秒）
    socketTimeoutMS: 45000, // 设置 socket 超时时间（毫秒）
});


import UserRoutes from "./users/routes.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from "./assignments/routes.js";

const app = express();
const corsOptions = {
    credentials: true, 
    //origin: 'http://localhost:3000',
    origin: process.env.FRONTEND_URL
  };
app.use(cors(corsOptions)); 

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
  sameSite: "none",
  secure: true,
  };
}
app.use(
  session(sessionOptions)
);
app.use(express.json());

Lab5(app);
HelloRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
UserRoutes(app);

//app.listen(process.env.PORT || 4000);
app.listen(4000);