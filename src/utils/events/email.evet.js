import { EventEmitter } from "node:events";
import { confirmemailtemplate } from "../template/confirmemailtemplate.js";
import { sendemail } from "../email/send.emil.js";
import jwt from "jsonwebtoken"
import { generatetoken } from "../security/token.js";
export const emailevent=new EventEmitter()
emailevent.on("sendconfirmemail",async({email}={})=>{
    const emailtoken=generatetoken({payload:{email},signature:process.env.EMAIL_TOKEN_SIGN})
    
    
    console.log(emailtoken);
    
     const emaillink=`${process.env.FE_URL}/confirm_email/${emailtoken}`
   const html=confirmemailtemplate({link:emaillink})
  
   
    await sendemail({to:email,subject:"confirmemail",html})
})