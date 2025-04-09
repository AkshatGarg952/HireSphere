import Applicant from "./applicants.schema.js"
import bcrypt from 'bcrypt';
export default class ApplicantsR{

    async register(details){

    const old = await Applicant.findOne({email:details.email});
        if(old){
        throw new Error("User with email already exists!");
        }

        try{
            const newUser = new Applicant({
                name:details.name,
                email:details.email,
                password:details.password,
            })
    
            const saltRounds = 12;
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(newUser.password, salt);
            newUser.password = hash;
            console.log("Applicant has been saved successfully!");
            return await newUser.save();
            
    }

    catch(err){
        console.log('Error in User registration', err);
        throw err;
    }
}

       async login(details){
        const old = await Applicant.findOne({email:details.email});
                if(!old){
                    throw new Error("Please register first before signing in!");
                }
        
                const isMatch = await bcrypt.compare(details.password, old.password);
                if(!isMatch){
                    throw new Error("Invalid credentials! Please check your email or password.");
                }
        
                return old;
       }


}
