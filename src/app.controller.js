
import connectdb from "./DB/connection.js"
import authcontroller from "./modules/auth/auth.controller.js"
import usercontroller from "./modules/user/user.controller.js"
import { globalerrorhandler } from "./utils/error/error.js"
import messagecontroller from "./modules/messages/message.controller.js"
import cors from "cors"
const bootstrap=(app,express)=>{
    app.use(cors())
app.use(express.json())
app.get("/",(req,res,next)=>{res.json({message:"welcome in node.js project"})})
app.use("/auth",authcontroller)
app.use("/user",usercontroller)
app.use("/message",messagecontroller)
app.all("*",(req,res,next)=>{res.status(404).json({message:"in-valid routing"})})
app.use(globalerrorhandler)
connectdb()
}
export default bootstrap