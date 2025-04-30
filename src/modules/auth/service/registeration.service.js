import usermodel from "../../../DB/models/user.model.js";
import { asynchandler } from "../../../utils/error/error.js";
import { successresponse } from "../../../utils/responses/success.response.js";
import { generatehash } from "../../../utils/security/hash.js";

export const signup = asynchandler(
  async (req, res, next) => {
    const { username, email, password,role} = req.body;
    if ( await usermodel.findOne({ email })) {
      return next(new Error("Email already exists"),{cause:409})
    }
const hashedpassword=generatehash({plaintext:password})

    const user = await usermodel.create({ username, email, password:hashedpassword ,role});

    return successresponse({res,message:"done",data:{user},status:201})
  }
)

  



 

