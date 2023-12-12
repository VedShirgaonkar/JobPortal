import express from "express";
import userAuth from "../middleware/auth.middleware.js"
import { createJobController, deleteJobController, getAllJobController, getjobStatsController, updateJobController } from "../controllers/jobs.controllers.js";
const router = express.Router()
router.route("/create-job").post(userAuth,createJobController)
router.route("/getAll-job").get(userAuth,getAllJobController)
router.route("/update-job/:id").patch(userAuth,updateJobController)
router.route("/delete-job/:id").delete(userAuth,deleteJobController)
router.route("/get-job-stats").get(userAuth,getjobStatsController)

export default router;