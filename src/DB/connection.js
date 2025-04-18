import mongoose from "mongoose";
import { error } from "node:console";
import usermodel from "./models/user.model.js";
const connectdb=async()=>{
   await mongoose.connect(process.env.DB_URL).then(res=>{
    console.log("the database is connected");
    
   }).catch(err=>{
    console.error("the database is failed to connect",err);
    
   })
}
export default connectdb