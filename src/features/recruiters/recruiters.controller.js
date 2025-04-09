import RecruiterR from "./recruiters.repository.js";
import jwt from 'jsonwebtoken';
const RR = new RecruiterR();
export default class RecruiterC{



    recruiterPage(req,res){
        const recruiterId = req.query.recruiterId;
        console.log(recruiterId);
        res.render('recruiterPage',{layout:false,recruiterId:recruiterId});
    }

    dashboard(req, res){
        const recruiterId = req.query.recruiterId;
        console.log(recruiterId);
        res.render('recruiterDashboard',{layout:false, recruiterId:recruiterId});
    }

    async register(req, res){

        try{
        const recruiter = await RR.register(req.body);
        const token = jwt.sign({ id: recruiter._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        
             
                res.cookie("token", token, {
                httpOnly: true, 
                secure: true,
                sameSite: "Strict", 
            });
        res.redirect(`/api/recruiters/recruiterPage?recruiterId=${recruiter._id}`);
        }
        catch(err){
            if(err.message==="Recruiter with email already exists!"){
                res.render('Error3.ejs',{layout:false});
            }
            else{
                res.render('Error4.ejs',{layout:false});
            }
        
        }
    }



    async login(req, res){
        try{
        const recruiter = await RR.login(req.body);
        const token = jwt.sign({ id: recruiter._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        
             
                res.cookie("token", token, {
                httpOnly: true, 
                secure: true,
                sameSite: "Strict", 
            });
            
        console.log(recruiter);
        res.redirect(`/api/recruiters/recruiterPage?recruiterId=${recruiter._id}`);
        }
        catch(err){
        if(err.message==="Please register first before signing in!"){
            res.render('Error1.ejs',{layout:false});
        }
        else{
            res.render('Error2.ejs', {layout:false});
        }
          }    
}

logout(req, res){
    res.clearCookie("token", {
        httpOnly: true,
        secure: true, 
        sameSite: "Strict"
    });

    res.redirect("/");
}
}