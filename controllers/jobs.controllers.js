import Job from "../model/jobs.model.js";
import User from "../model/users.model.js";
const createJobController=async(req,res)=>{
    const { company, position } = req.body;
  if (!company || !position) {
    next("Please Provide All Fields");
  }
  const user = await User.findById(req.user.userId)
  req.body.createdBy =req.user.userId;
const job = await Job.create(req.body);
res.status(201).json({ job });
}
const getAllJobController=async(req,res,next)=>{
    const jobs = await Job.find({createdBy:req.user.userId});
    res.status(200).send({
        totalJobs:jobs.length,
        jobs
    })
}
const updateJobController=async(req,res,next)=>{
    const { id } = req.params;
    const { company, position } = req.body;
    if (!company || !position) {
        next("Please Provide All Fields");
      }
      const job = await Job.find({_id:id})
      if (!job) {
        next(`no jobs found with this id ${id}`);
      }
  
    //   if (!req.user.userId === job.createdBy.toString()) {
    //     next("Your Not Authorized to update this job");
    //     return;
    //   }
    if (!req.user.userId === job.createdBy.toString()) {
        next("Your Not Authorize to delete this job");
        return;
      }
      const updateJob = await Job.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({ updateJob });
}
const deleteJobController=async(req,res)=>{
    const { id } = req.params;
    const job = await Job.findOne({ _id: id });
    if (!job) {
        next(`No Job Found With This ID ${id}`);
      }
      if (!req.user.userId === job.createdBy.toString()) {
        next("Your Not Authorize to delete this job");
        return;
      }
      await job.deleteOne();
      res.status(200).json({ message: "Success, Job Deleted!" });
    
}
export{createJobController,
    getAllJobController,
    updateJobController,
    deleteJobController}