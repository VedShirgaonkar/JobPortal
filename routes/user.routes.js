import express from "express"
import { userLoginController, userRegisterController } from "../controllers/user.controllers.js";
const router = express.Router();
router.route("/userRegisteration").post(userRegisterController);
router.route("/userLogin").post(userLoginController)
export default router;
