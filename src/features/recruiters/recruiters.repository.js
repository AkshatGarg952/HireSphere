import Recruiter from "./recruiters.schema.js";
import bcrypt from 'bcrypt';
export default class RecruiterR{

    async register(details){
        
        const old = await Recruiter.findOne({email:details.email});
        if(old){
            throw new Error("Recruiter with email already exists!");
        }

        try{
        const newRecruiter = new Recruiter({
            name:details.name,
            email:details.email,
            password:details.password,
            company:details.company,
            designation:details.designation,
        })

        const saltRounds = 12;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(newRecruiter.password, salt);
        newRecruiter.password = hash;
        console.log("Recruiter has been saved successfully!");
        return await newRecruiter.save();
        
    }

    catch(err){
        console.log("Error while registering" , err);
        throw err;
    }
    }

    async login(details){
         
        const old = await Recruiter.findOne({email:details.email});
        if(!old){
            throw new Error("Please register first before signing in!");
        }

        const isMatch = await bcrypt.compare(details.password,old.password);
        
        if(!isMatch){
            throw new Error("Invalid credentials! Please check your email or password.");
        }

        return old;
    }
}