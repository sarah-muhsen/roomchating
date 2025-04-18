import Joi from "joi";


export const messageschema= Joi.object({
    recipenistid:Joi.string().required().hex().length(24).required(),
    message:Joi.string().required()
}).required()