import messagemodel from "../../../DB/models/message.model.js"
import usermodel from "../../../DB/models/user.model.js"
import { successresponse } from "../../../utils/responses/success.response.js"

export const sendmessage=async(req,res,next)=>{
    const{message,recipenistid}=req.body
    if(!await usermodel.findOne({_id:recipenistid,isdeleted:false})){
        return next(new Error('in-valid account'),{cause:404})
    }
    const user =await messagemodel.create({message,recipenistid})
    return successresponse({res,message:"done",status:201,data:{user}})
}