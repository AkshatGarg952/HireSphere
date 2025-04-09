import express from "express";
import ApplicantC from "./applicants.controller.js";
import jwtAuth from "../../middleware/jwt.middleware.js";


const applicantRouter = express.Router();
const applicantController = new ApplicantC();

applicantRouter.post("/register", (req,res)=>{
    applicantController.register(req,res);
});

applicantRouter.post("/login", (req,res)=>{
    applicantController.login(req,res);
});

applicantRouter.get("/applicantPage",jwtAuth, (req,res)=>{
    applicantController.applicantpage(req,res);
});

applicantRouter.get("/applicantPage2",jwtAuth, (req,res)=>{
    applicantController.applicantpage2(req,res);
});
applicantRouter.get("/applicantDashboard",jwtAuth, (req,res)=>{
    applicantController.dashboard(req,res);
});



applicantRouter.get("/logout", jwtAuth, (req, res)=>{
    applicantController.logout(req, res);
})

export default applicantRouter;