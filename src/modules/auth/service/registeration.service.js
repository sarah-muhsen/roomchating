import usermodel from "../../../DB/models/user.model.js";
import { emailevent } from "../../../utils/events/email.evet.js";
import { asynchandler } from "../../../utils/error/error.js";
import { successresponse } from "../../../utils/responses/success.response.js";
import { generatehash } from "../../../utils/security/hash.js";
import { generateencrypt } from "../../../utils/security/encryption.js";
import { decoded } from "../../../utils/security/token.js";
export const signup = asynchandler(
  async (req, res, next) => {
    const { username, email, password, confirmpassword ,phone} = req.body;
    if (password !== confirmpassword) {
      return next(new Error("password!=cpassword"),{cause:400})
    }
    if ( await usermodel.findOne({ email })) {
      return next(new Error("Email already exists"),{cause:409})
    }
const hashedpassword=generatehash({plaintext:password})
const encryptedphone=generateencrypt({plaintext:phone,signature:process.env.PHONR_ENC})
    const user = await usermodel.create({ username, email, password:hashedpassword,phone:encryptedphone });
emailevent.emit("sendconfirmemail",{email})
    return successresponse({res,message:"done",data:{user},status:201})
  }
)
export const confrimemail= asynchandler(async (req, res, next) => {
  const {authorzation}=req.headers

const decodedToken=decoded({token:authorzation,signature:process.env.EMAIL_TOKEN_SIGN})
  console.log(decodedToken);
  const user=await usermodel.findOneAndUpdate({email:decodedToken.email},{confirmemail:true},{new:true})
  console.log(user);
    return successresponse({res,message:"done",status:201})
  } )
  



 

