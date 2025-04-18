import { Router } from "express";
import profile, { freezeaccount, shareprofile, updatepassword, updateprofile } from "./service/user.service.js";
import { Authentication, authorization } from "../../middleware/auth.middleware.js";
import { endpoint } from "./user.endpoint.js";
import { validation } from "../../middleware/validation.middleware.js";
import { updatepasswordeschema, updateprofileschema } from "./service/user.validator.js";

const router=Router()
router.get("/profile", Authentication(),authorization(endpoint.profile),profile)
router.get("/profile/:id",shareprofile)
router.patch("/profile",validation(updateprofileschema), Authentication(),authorization(endpoint.profile),updateprofile)
router.patch("/profile/password",validation(updatepasswordeschema), Authentication(),authorization(endpoint.profile),updatepassword)
router.delete("/profile", Authentication(),authorization(endpoint.profile),freezeaccount)

export default router
