import jwt from "jsonwebtoken";


export const generatetoken = ({payload = {}, signature = process.env.TOKEN_SIGN}={}) => {

    
    const token = jwt.sign(payload, signature);
    return token;

};
 export const decoded = ({token = "", signature = process.env.TOKEN_SIGN}={}) => {
  
    const decodedToken = jwt.verify(token, signature);
    return decodedToken;
  
 };
