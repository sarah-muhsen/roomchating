import Router from "express";
import * as roomservice from "./services/room.services.js"
import {  Authentication, authorization } from "../../middleware/auth.middleware.js";
import { accessroles } from "../../DB/models/user.model.js";


const router=Router()

router.post("/createroom",Authentication(),roomservice.createroom)
router.get("/getrooms",roomservice.getrooms)
router.delete("/deleteroom/:roomid",Authentication(),roomservice.deleteroom)
router.post("/getchatroom/:roomId",Authentication(),roomservice.getchats)

export default router