import Job from "../model/jobs.model.js";
import User from "../model/users.model.js";
import mongoose from "mongoose";
import moment from "moment";
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
const {status,workType,search,sort}=req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };
  if (status && status !== "all") {
    queryObject.status = status;
  }
  if(workType && workType!=="all"){
    queryObject.workType=workType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  let queryResult =   Job.find(queryObject)
    if(sort  == "latest"){
      queryResult=queryResult.sort('-createdAt')
    }
    if (sort === "oldest") {
      queryResult = queryResult.sort("createdAt");
    }
    if (sort === "a-z") {
      queryResult = queryResult.sort("position");
    }
    if (sort === "z-a") {
      queryResult = queryResult.sort("-position");
    }
//pagination
const page = Number(req.query.page) || 1;
const limit = Number(req.query.limit) || 10;
const skip = (page - 1) * limit;
queryResult = queryResult.skip(skip).limit(limit);
const totalJobs = await Job.countDocuments(queryResult);
  const numOfPage = Math.ceil(totalJobs / limit);
  const jobs=  await queryResult;
 


    //const jobs = await Job.find({createdBy:req.user.userId});
    res.status(200).send({
        totalJobs,
        jobs,
        numOfPage
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
const getjobStatsController=async(req,res)=>{
  const stats= await Job.aggregate([{
    $match:{
      createdBy:new mongoose.Types.ObjectId(req.user.userId)
    }
  },
  {
    $group:{
      _id:"$status",
      count:{$sum:1}
    }
  }
]);
 const  defaultStats={
  pending: stats.pending || 0,
  reject: stats.reject || 0,
  interview: stats.interview || 0,
}

let monthlyApplication= await Job.aggregate([
  {
    $match:{
      createdBy:new mongoose.Types.ObjectId(req.user.userId)
    }
  },
  {
    $group:{
      _id:{
        year:{$year:'$createdAt'},
        month:{$month:'$createdAt'}
      },
      count:{
        $sum:1
      }
    }
  }
])
monthlyApplication=monthlyApplication.map((docItem)=>{
  const{_id:{year,month},count}=docItem
  const date=  moment().month(month-1).year(year).format('MMM Y')
  return {date,count}
}).reverse()
  res.status(200).json({totalJobs:stats.length,defaultStats,monthlyApplication});
}


export{createJobController,
    getAllJobController,
    updateJobController,
    deleteJobController,
    getjobStatsController}