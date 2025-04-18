import { Router } from "express";
import { sendmessage } from "./services/message.service.js";
import { validation } from "../../middleware/validation.middleware.js";
import { messageschema } from "./message.validation.js";
const router=Router()
router.post("/sendmessage",validation(messageschema),sendmessage)
export default router