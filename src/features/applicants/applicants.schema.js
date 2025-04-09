import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: [3, 'Name must be at least 3 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters'] },

  email: {type: String, required: true, unique: true, trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'] },

  password: { type: String, required: true, trim:true,  minlength: [3, 'Name must be at least 3 characters'], },

  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Applicant", applicantSchema);
