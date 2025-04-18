import Router from "express";
import * as authservice from "./service/registeration.service.js"
import { login } from "./service/login.service.js";
import { validation } from "../../middleware/validation.middleware.js";

import * as validators from "./auth.validation.js"


const router=Router()

router.post("/signup/:id",validation(validators.signupschema),authservice.signup)
router.patch("/confirmemail",authservice.confrimemail)
router.post("/login",login)
export default router