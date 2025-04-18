import usermodel from "../../../DB/models/user.model.js";
import { userroles } from "../../../middleware/auth.middleware.js";
import { asynchandler } from "../../../utils/error/error.js";
import { successresponse } from "../../../utils/responses/success.response.js";
import { comparehash} from "../../../utils/security/hash.js";
import {  generatetoken } from "../../../utils/security/token.js";
//jkjjjjj
export const login = asynchandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await usermodel.findOne({ email});
  if (!user) {
    return next(new Error("there is no user here"),{cause:401})
  }
  if(!user.confirmemail){
    return next(new Error("please confirm your email first"),{cause:404})
  }
if(!comparehash({plaintext:password,hashvalue:user.password})){
  return next(new Error("Invalid login credentials"),{cause:401})
}
let signature;
if (user.role === userroles.user) {
  signature = process.env.TOKEN_SIGN;
} else {
  signature = process.env.TOKEN_SIGN_ADMIN;
}

console.log("Using signature:", signature); 


const token = generatetoken({
  payload: { id: user._id, islogged: true, username: user.username },
  signature: signature,
});
if (user.isdeleted) {
  return res.status(403).json({ message: 'Account is frozen. Contact support.' });
}

return successresponse({res,message:"done",data:{token}})
})


 

