//const express = require('express');
import "dotenv/config";
import express from "express";
import HelloRoutes from "./hello.js"; 
import Lab5 from "./lab5.js";
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from "./assignments/routes.js";

const app = express();
app.use(cors());   
app.use(express.json());

Lab5(app);
HelloRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);

app.listen(process.env.PORT || 4000);