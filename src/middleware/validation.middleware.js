
import Joi from "joi";
export const validateobjectid=(value,helper)=>{
    return Types.ObjectId.isvalid(value)?true:helper.message("in-valid objectid")
}

export const generalfields ={
  username: Joi.string(),
  email: Joi.string().email({ minDomainSegments: 2, maxDomainSegments: 3, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
  confirmpassword: Joi.string().valid(Joi.ref("password")),
  phone: Joi.string().pattern(new RegExp(/^(002|\+2)?01[0125][0-9]{8}$/)),
  id: Joi.boolean(),
  geneder:Joi.string(),
  'accept-language': Joi.string().valid("en", "arb")
}

export const validation=(schema,)=>{
    return  (req,res,next)=>{  
        const inputData={...req.body,...req.query,...req.params}
        console.log(inputData);    
        if(req.headers["accept-language"]){
            inputData['accept-language']=req.headers['accept-language']
         }
         const validationresult=schema.validate(inputData,{abortEarly:false})
               if(validationresult.error){
                return res.status(400).json({message:"valiodadtion error",validationresult:validationresult.error.details})
                 
                 }
                 return next()
       }
    }

// export const validation=(schema,)=>{
    
    
//  return  (req,res,next)=>{  
//     let cartona=[]
//     console.log(Object.keys(signupschema));
    
//     for (const key of Object.keys(signupschema)) {
//         console.log("Found key:", key); // Should log both "body" and "params"
//         const validationresult=signupschema[key].validate(req[key],{abortEarly:false})
//         if(validationresult.error){
//           cartona.push({key,err:validationresult.error.details})
        
//         }
//     }
//         if(cartona.length>0){
//             return res.status(400).json({message:"validation error",cartona})
        
//         }

     
        
//         return next()
//     }
    
   
// }