import express from "express";
import { updateUserController } from "../controllers/updateUser.controllers.js";
import userAuth from "../middleware/auth.middleware.js";
const router=express.Router();
router.route("/updateUser").put(userAuth, updateUserController)
export default router;