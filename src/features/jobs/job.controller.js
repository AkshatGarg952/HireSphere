import JobR from "./job.repository.js";

const JR = new JobR();
export default class jobC{
 
    async apply(req, res){
      
        await JR.apply(req.params.userId, req.params.jobId);
        res.redirect(`/api/applicants/applicantPage/?userId=${req.params.userId}`);
        
}

async unapply(req, res){
     const user = await JR.unapply(req.params.userId, req.params.jobId);
     res.redirect(`/api/applicants/applicantpage?userId=${req.params.userId}`);
      
}

async allApplied(req, res){
  try{
    const job = await JR.getAppliedJobs(req.params.userId);
    console.log(job);
        res.status(201).send(job);
  }
  catch(err){
    res.status(401).send(err.message);
  }
}

async allAppliedtitle(req, res){
  try{
      const jobs =  await JR.getAppliedtitle(req.params.userId, req.params.title);
  res.status(201).send(jobs);
  }

  catch(err){
    res.status(401).send(err.message);
  }
}


async allJobs(req, res){
    const jobs = await JR.getAllJobs();
    res.status(201).send(jobs);
}

async add(req, res){
  try{
   const job = await JR.add(req.body, req.params.rId);
   res.redirect(`/api/recruiters/recruiterPage?recruiterId=${req.params.rId}`);
  }
  catch(err){
    res.status(401).send(err);
  }
}

async update(req, res){
   try{
    const job = await JR.updateJob(req.params.jobId, req.body);
    res.status(201).send(job);
   }
   catch(err){
    res.status(401).send(err.message);
   }
 
}

async delete(req, res){
await JR.deleteJob(req.params.jobId);
res.status(201).send("Job Deleted Successfuly!");
}

async postedJobs(req, res){
  
 const jobs =  await JR.getPostedJobs(req.params.rId);
 console.log(jobs);
 res.status(201).send(jobs);
}

async postedtitleJobs(req, res){
  const jobs =  await JR.postedtitleJobs(req.params.recruiterId,req.params.title);
  res.status(201).send(jobs);
}

async titledjobs(req, res){
  try{
    const title = req.params.title;
    const jobs = await JR.titledjobs(title);
    res.status(201).send(jobs);
  }
  catch(err){
    res.status(401).send(err.message);
  }
}

async details(req, res){
  const job = await JR.getbyId(req.params.jobId);
  res.render('jobDetail2',{layout:false, job:job, recruiterId:job.recruiter});
}

async details2(req, res){
  const job = await JR.getbyId(req.params.jobId);
  res.render('jobDetail',{layout:false, job:job, userId:req.params.userId});
}


async details3(req, res){
  const job = await JR.getbyId(req.params.jobId);
  res.render('jobDetail3',{layout:false, job:job, userId:req.params.userId});
}


async filter1(req, res){
const hob = await JR.filter1(req.params.filter);
res.status(201).send(hob);
}

async filter2(req, res){
  const hob = await JR.filter2(req.params.filter, req.params.rId);
  res.status(201).send(hob);
  }

}