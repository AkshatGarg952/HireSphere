import express from "express";
import RecruiterC from "./recruiters.controller.js";
import jwtAuth from "../../middleware/jwt.middleware.js";

const recruiterRouter = express.Router();
const recruiterController = new RecruiterC();

recruiterRouter.post("/register", (req,res)=>{
    recruiterController.register(req,res);
});

recruiterRouter.post("/login", (req,res)=>{
    recruiterController.login(req,res);
});

recruiterRouter.get("/recruiterPage",jwtAuth, (req,res)=>{
    console.log(req.params);
    recruiterController.recruiterPage(req,res);
});

recruiterRouter.get("/logout", jwtAuth, (req, res)=>{
    recruiterController.logout(req, res);
})

recruiterRouter.get("/dashboard", jwtAuth, (req, res)=>{
    recruiterController.dashboard(req, res);
})






export default recruiterRouter;