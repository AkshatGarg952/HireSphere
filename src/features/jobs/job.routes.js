import express from "express";
import JobC from "./job.controller.js";
import jwtAuth from "../../middleware/jwt.middleware.js";


const jobRouter = express.Router();
const jobController = new JobC();

jobRouter.get("/apply/:userId/:jobId",jwtAuth, (req,res)=>{
    jobController.apply(req,res);
});

jobRouter.get("/unapply/:userId/:jobId",jwtAuth, (req,res)=>{
    jobController.unapply(req,res);
});

jobRouter.get("/allApplied/:userId",jwtAuth, (req,res)=>{
    jobController.allApplied(req,res);
});

jobRouter.get("/allAppliedtitlewise/:userId/:title",jwtAuth, (req,res)=>{
    jobController.allAppliedtitle(req,res);
});

jobRouter.get("/allJobs",jwtAuth, (req,res)=>{
    jobController.allJobs(req,res);
});


jobRouter.post("/add/:rId",jwtAuth, (req,res)=>{
    console.log("Received request:", req.params);
    jobController.add(req,res);
});

jobRouter.post("/update/:jobId",jwtAuth, (req,res)=>{
    jobController.update(req,res);
});

jobRouter.delete("/delete/:jobId",jwtAuth, (req,res)=>{
    jobController.delete(req,res);
});

jobRouter.get("/postedJobs/:rId",jwtAuth, (req,res)=>{
    console.log(req.params.rId);
    jobController.postedJobs(req,res);
});

jobRouter.get("/postedtitledJobs/:rId/:title",jwtAuth, (req,res)=>{
    console.log(req.params);
    jobController.postedtitleJobs(req,res);
});


jobRouter.get("/titlewise/:title",jwtAuth, (req,res)=>{
    jobController.titledjobs(req,res);
});

jobRouter.get("/details/:jobId",jwtAuth, (req,res)=>{
    jobController.details(req,res);
});

jobRouter.get("/details2/:jobId/:userId",jwtAuth, (req,res)=>{
    jobController.details2(req,res);
});

jobRouter.get("/details3/:jobId/:userId",jwtAuth, (req,res)=>{
    jobController.details3(req,res);
});

jobRouter.get("/hiringA/:filter",jwtAuth, (req,res)=>{
    jobController.filter1(req,res);
});

jobRouter.get("/hiringR/:rId/:filter",jwtAuth, (req,res)=>{
    jobController.filter2(req,res);
});


export default jobRouter;