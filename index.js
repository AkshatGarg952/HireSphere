import express from 'express';
import connectDB  from '../Job/mongoose.js';
import expressLayouts from 'express-ejs-layouts';
import ejsLayouts from "express-ejs-layouts";
import path from 'path'
import { fileURLToPath } from 'url'
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import recruiterRouter from "./src/features/recruiters/recruiters.routes.js";
import applicantRouter from "./src/features/applicants/applicants.routes.js";
import jobRouter from "./src/features/jobs/job.routes.js";


dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

app.set('view engine', 'ejs')
app.set('views', path.join(path.resolve(), 'src', 'views'))
app.use(ejsLayouts)

app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'src', 'public')));
app.use("/api/recruiters", recruiterRouter);
app.use("/api/applicants", applicantRouter);
app.use("/api/jobs", jobRouter);

app.get('/',(req,res)=>{
    const user = req.query.user;
    const recruiter = req.query.recruiter;
   
    res.render('heroPage',{layout:false, user:user, recruiter:recruiter});
    
})

app.get('/error', (req, res)=>{

    res.render('Error5',{layout:false});
})



app.listen(process.env.PORT_NO, () => {
    connectDB();
    console.log('Listening on port 5000')
    });
    
