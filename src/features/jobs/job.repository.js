import Job from "./jobs.schema.js";
import Applicant from "../applicants/applicants.schema.js"
import Recruiter from "../recruiters/recruiters.schema.js"
import mongoose from "mongoose";
export default class JobR{

    async add(details, rId){
        try{
        const existingJob = await Job.findOne({ title:details.title, company:details.company, recruiter:details.recruiter});
        if(existingJob){
            throw new Error("Cannot post the same Job again!");
        }
        
        const newJob = new Job({
            title:details.title,
            company:details.company,
            role:details.role,
            recruiter:rId,
            category:details.category,
            type:details.type,
            description:details.description,
            requirements:details.requirements.split(",").map(skill => skill.trim()),
            salary:details.salary,
            location:details.location,
            maxCandidates:details.maxCandidates,
          });
          const savedJob = await newJob.save();
          const recruiter = await Recruiter.findById(rId);
          recruiter.jobsPosted.push(savedJob._id);
          await recruiter.save();
          return savedJob;

          
        }
        catch(err){
            console.log('Error while adding job', err);
            throw err;
        }
    }

    async updateJob(id,job){
      try{
       const oldJob = await Job.findById(id);
        Object.assign(oldJob, job);
        return await oldJob.save();
      }
      catch(err){
        throw err;
    }
      
    }

     async deleteJob(id){
            const oldJob = await Job.findById(id);        
            if(oldJob){
                 await Job.findByIdAndDelete(id);
                 await Recruiter.findOneAndUpdate(
                    { jobsPosted: id }, 
                    { $pull: { jobsPosted: id } }, 
                    { new: true },
                  );

                await Applicant.findOneAndUpdate(
                    { appliedJobs: id }, 
                    { $pull: { appliedJobs: id } }, 
                    { new: true },
                  ) 

            }
            else{
                return new Error("Cannot find the Job!");
            }
        }

    async getAllJobs(){
        const allJobs = await Job.find();
        return allJobs;
    }    

    async getAppliedJobs(userId){
        try {    
            const appliedJobs = await Job.find({ applicants: { $in: userId } });
            return appliedJobs;
          } catch (error) {
            console.error("Error fetching applied jobs:", error);
            throw error;
          }
    }

    async getAppliedtitle(userId, title){
      try {    
        const appliedJobs = await Job.find({ 
          applicants: { $in: [userId] },
          title: title 
        });
    
        return appliedJobs;
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
        throw error;
      }
    }
    
    async getPostedJobs(recruiterId){
           
            const JobsPosted = await Job.find({ recruiter:new mongoose.Types.ObjectId(recruiterId)});
            console.log(JobsPosted);
            return JobsPosted;
          
    }

    async postedtitleJobs(recruiterId, title){
  
        const appliedJobs = await Job.find({ 
          recruiter: recruiterId,
          title: title 
        });
    
        return appliedJobs;
      
    }

    async apply(userId, jobId){
      const job = await Job.findById(jobId);

      if(job.applicants.length>=job.maxCandidates){
        jpb.hiring = "Hiring Closed";
        throw Error("Job Hiring has been closed");
        
      }
      job.applicants.push(userId);    
      await job.save();

      const applicant = await Applicant.findById(userId);
      applicant.appliedJobs.push(jobId);
      await applicant.save();
    }

    async unapply(userId, jobId){
      const job = await Job.findByIdAndUpdate(jobId, { $pull: { applicants: userId } });
      job.hiring=="Actively Hiring";

      await Applicant.findByIdAndUpdate(userId, { $pull: { appliedJobs: postId } });
      
    }

    async titledjobs(title){
       const jobs = await Job.find({title:title});
       return jobs;
    }

    async getbyId(jobId){
      return await Job.findById(jobId);
    }

    async filter1(filter){
      return await Job.find({hiring:filter});
    }

    async filter2(filter, rId){
      return await Job.find({recruiter:rId, hiring:filter})
    }


}
