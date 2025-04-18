import mongoose, { model, Schema } from "mongoose";
import { userroles } from "../../middleware/auth.middleware.js";
const userschema=new Schema({
username:{
    type:String,
    minlength:3,
    maxlength:30,
    trim:true,
    required:[true,"username is required"]
},
email:{
    type:String,
    unique:true,
    required:true
},
password:{
    type:String,

    required:true
}
,
gender:{
    type:String,
   enum:["male","female"],
   default:'male'
},
DOB:Date,
address:String,
phone:String,
image:String,
confirmemail:{
    type:Boolean,
    default:false,
},
role:{
type:String,
default:userroles.admin,
enum:Object.values(userroles)
},
changepasswordtime:Date,
isdeleted:{
    type:Boolean,
    default:false
}

},{timestamps:true})
const usermodel=mongoose.models.user||model("user",userschema)
export default usermodel