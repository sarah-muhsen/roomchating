import mongoose, { model, Schema } from "mongoose";
export const accessroles={
    admin:"admin",
    user:"user"
}
const userschema=new Schema({
username:{
    type:String,
   required:true
},
email:{
    type:String,
    unique:true,
    required:true
},
password:{
    type:String,
    required:true
},
role:{
    type:String,
    required:true,
    enum: ['user', 'admin'],
}
})
const usermodel=mongoose.models.user||model("user",userschema)
export default usermodel