import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({

  title: { type: String, required: true, trim: true, minlength: 3 },

  role: { type: String, required: true, trim: true, minlength: 3 },

  company: { type: String, required: true, trim: true, minlength: 2 },

  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: "Recruiter" },

  description: { type: String, required: true, trim: true, minlength: 10 },

  requirements: [{ type: String, trim: true, minlength: 2 }],

  category: { type: String, trim: true, minlength: 2 },

  type: { type: String, trim: true, minlength: 2 },

  salary: { type: String, trim: true },

  location: { type: String, required: true, trim: true, minlength: 3 },

  maxCandidates: { type: Number, required: true, min: 1, default: 10 },

  hiring: { type: String, default:"Actively Hiring"},

  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Applicant" }],

  createdAt: { type: Date, default: Date.now },

});

export default mongoose.model("Job", jobSchema);
