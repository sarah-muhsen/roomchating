
import connectdb from "./DB/connection.js"
import authcontroller from "./modules/auth/auth.controller.js"
import roomcontroller from "./modules/room/room.controller.js"
import { globalerrorhandler } from "./utils/error/error.js"
import cors from "cors"
const bootstrap=(app,express)=>{
    app.use(cors())
app.use(express.json())
app.get("/",(req,res,next)=>{res.json({message:"welcome in node.js project"})})
app.use("/auth",authcontroller)
app.use("/room",roomcontroller)
app.all("*",(req,res,next)=>{res.status(404).json({message:"in-valid routing"})})
app.use(globalerrorhandler)
connectdb()
}
export default bootstrap