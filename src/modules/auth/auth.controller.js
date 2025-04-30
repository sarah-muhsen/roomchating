import Router from "express";
import * as authservice from "./service/registeration.service.js"
import { login } from "./service/login.service.js";

const router=Router()

router.post("/signup",authservice.signup)
router.post("/login",login)
export default router