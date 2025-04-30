import usermodel from "../../DB/models/user.model.js";
import { decoded } from "../../utils/security/token.js";
import jwt from "jsonwebtoken";

export const authentication = async (socket = {}) => {
 
    const authHeader = socket?.handshake?.auth?.authorization;

    if (!authHeader) {
      throw new Error("Authorization header missing");
    }

    const [bearer, token] = authHeader.split(" ");

    // console.log({ bearer, token });
    // console.log("token", { token });

    if (bearer !== "admin" || !token) {
      throw new Error("Invalid authorization format");
    }
    let signature=process.env.TOKEN_SIGN_ADMIN

    const tokendecoded = decoded({ token ,signature});

    // console.log("decoded token:", tokendecoded);

    if (!tokendecoded?.id) {
      throw new Error("Invalid token payload: id missing");
    }

    const user = await usermodel.findById(tokendecoded.id);

    if (!user) {
      throw new Error("User not found");
    }

    // console.log("Authenticated user:", user);

   return user
    
  } 

