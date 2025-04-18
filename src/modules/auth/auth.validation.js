
import Joi from "joi";
import { generalfields } from "../../middleware/validation.middleware.js";

export const signupschema = Joi.object({
  username: generalfields.username.required(),
  email: generalfields.email.required(),
  password: generalfields.password.required(),
  confirmpassword: generalfields.confirmpassword.required(),
 
}).required().options({ allowUnknown: true });


// export const signupschema={
//     body:joi.object().keys({
//         username:joi.string().required(),
//         email:joi.string().email({minDomainSegments:2,maxDomainSegments:3,tlds:{allow:['com',"net"]}})
//         ,password:joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
//         confirmpassword:joi.string().valid(joi.ref("password")).required(),
//         phone:joi.string().pattern(new RegExp(/^(002|\+2)?01[0125][0-9]{8}$/)),
        
//       }).required().options({allowUnknown:true}),
//       params:joi.object().keys({
//         id:joi.boolean().required()
        
//       }).required().options({allowUnknown:true})
// }


