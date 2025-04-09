import ApplicantR from "./applicants.repository.js";
import jwt from 'jsonwebtoken';
const AR = new ApplicantR();

export default class ApplicantC{

    applicantpage(req, res){
        const userId = req.query.userId;
        res.render('applicantPage',{layout:false, userId:userId});
    }

    applicantpage2(req, res){
        const userId = req.query.userId;
        console.log(userId);
        res.render('appliedJobs',{layout:false, userId:userId});
    }

    dashboard(req, res){
        const userId = req.query.userId;
        res.render('applicantDashboard',{layout:false, userId:userId});
    }

    async register(req, res){

        try{
        const user = await AR.register(req.body);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        
             
                res.cookie("token", token, {
                httpOnly: true, 
                secure: true,
                sameSite: "Strict", 
            });

        res.redirect(`/api/applicants/applicantPage?userId=${user._id}`);
        }
        catch(err){ if(err.message==="Recruiter with email already exists!"){
            res.render('Error3.ejs',{layout:false});
        }
        else{
            res.render('Error4.ejs',{layout:false});
        }res.status(401).send(err.message);
        }
    }
    async login(req, res){
        try{
        const user = await AR.login(req.body);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        
             
                res.cookie("token", token, {
                httpOnly: true, 
                secure: true,
                sameSite: "Strict", 
            });
            
        res.redirect(`/api/applicants/applicantPage?userId=${user._id}`);
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