
import mongoose, { Schema,Mongoose ,model} from "mongoose";
const messageschema=new Schema({
message:{
    type:String,
    required:true,
    minlength:5,
    maaxlength:5000,
    trim:true
},
recipenistid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
}
},{
    timestamps:true
})
const messagemodel=mongoose.models.message||model("message",messageschema)
export default messagemodel