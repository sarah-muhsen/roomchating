
import usermodel from "../DB/models/user.model.js";
import { asynchandler } from "../utils/error/error.js";
import { decoded } from "../utils/security/token.js";
export const userroles = {
  user: "user",
  admin: "admin",
};
export const Authentication = () => {
  return asynchandler(async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return next(new Error("Missing authorization header"),{cause:400})
    }
    const [bearer, token] = authorization.split(" ");
    if (!bearer || !token) {
      return next(new Error("Invalid authorization format"),{cause:400})
    }
    let signature;
    switch (bearer) {
      case userroles.admin:
        signature = process.env.TOKEN_SIGN_ADMIN;
        break;
      case userroles.user:
        signature = process.env.TOKEN_SIGN;
        break;
      default:
        return next(new Error("Invalid token type"),{cause:400})
    }
   
    const tokendecoded=decoded({token,signature})
  

 
    
    
    if (!tokendecoded?.id) {
      return next(new Error("Invalid token payload"),{cause:400})
    }
    const user = await usermodel.findById(tokendecoded.id);
  
    
    if (!user) {
      return next(new Error("User not found or deleted"),{cause:400})
    }
    if(user.changepasswordtime?.getTime()>=tokendecoded.iat*1000){
      return next (new Error("in-valid credentails"),{cause:400})
       
      }

    req.user = user;
    next();
 
})
};
export const authorization = (acessroles = []) => {
  return asynchandler( (req, res, next) => {
    
    if (!req.user || !req.user.role) {
      return next(new Error("User role not found"),{cause:400})
    }
    if (!acessroles.includes(req.user.role)) {
      return next(new Error("Unauthorized access"),{cause:403})
    }
    next();
 
})
};
