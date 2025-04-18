
import { asynchandler } from "../../../utils/error/error.js"
import { generatedecrypt } from "../../../utils/security/encryption.js"
import { successresponse } from "../../../utils/responses/success.response.js"
import usermodel from "../../../DB/models/user.model.js";
import { comparehash, generatehash } from "../../../utils/security/hash.js";
import messagemodel from "../../../DB/models/message.model.js";
export const profile = asynchandler(async (req, res, next) => {
    req.user.phone = generatedecrypt({
        ciphertext: req.user.phone,
        signature: process.env.PHONE_ENC
    });
    const messages=await messagemodel.find({recipenistid:req.user._id}).populate("recipenistid","-password")
    return successresponse({ res, message: "done", data: { user: req.user ,messages} });
});

export const updateprofile = asynchandler(async (req, res, next) => {
const user =await usermodel.findByIdAndUpdate(req.user.id,req.body,{new:true,runValidators:true})
    return successresponse({ res, message: "done",data:{user}});
});
export const shareprofile = asynchandler(async (req, res, next) => {
    const user =await usermodel.findOne({_id:req.params.id,isdeleted:false}).select("username email")
        return user? successresponse({ res, message: "done",data:{user}}) :next(new Error("in-valid ID"),{cause:409})
    });
export const updatepassword = asynchandler(async (req, res, next) => {
    const{password,oldpassword}=req.body;
    if(!comparehash({plaintext:oldpassword,hashvalue:req.user.password})){
        return next(new Error("in valid password",{cause:409}))
    }
    const hashpassword=generatehash(password)
    const user =await usermodel.findByIdAndUpdate(req.user.id,{password:hashpassword,changepasswordtime:Date.now()},{new:true,runValidators:true})
        return successresponse({ res, message: "done",data:{user}});
    });
    export const freezeaccount = asynchandler(async (req, res, next) => {
        
        const user =await usermodel.findByIdAndUpdate(req.user.id,{isdeleted:true,changepasswordtime:Date.now()},{new:true,runValidators:true})
            return successresponse({ res, message: "done",data:{user}});
        });
        
export default profile