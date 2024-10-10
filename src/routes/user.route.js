import { Router } from "express";
import { registerUser, loginUser, logoutuser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleweres/auth.middlewaare.js";


const router = Router()


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)


//securedroutes

router.route("/logout").post(verifyJWT, logoutuser)

export default router
