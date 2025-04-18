import Joi from "joi";
import { generalfields, validateobjectid } from "../../../middleware/validation.middleware.js";

export const validateidschema = Joi.object({
    id:Joi.string().required().hex().length(24).custom(validateobjectid)
  }).required()
export const updateprofileschema = Joi.object({
  username: generalfields.username,
  phone:generalfields.phone,
  gender:generalfields.geneder
}).required()
export const updatepasswordeschema = Joi.object({
   oldpassword:generalfields.password.required(),
   password:generalfields.password.not(Joi.ref("oldpassword")).required(),
   confirmpassword:generalfields.confirmpassword.valid(Joi.ref("password")).required()

  }).required()