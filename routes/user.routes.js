import express from "express"
import { userRegisterController } from "../controllers/user.controllers.js";
const router = express.Router();
router.route("/userRegisteration").post(userRegisterController)
export default router;
