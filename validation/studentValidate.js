const Joi = require('joi');

//uses joi to define the validation rules
module.exports = {
    body :   {
        firstname : Joi.string().required(),
        lastname : Joi.string().required(),
        gender : Joi.boolean(),
        date_of_birth : Joi.required(),
        email : Joi.string().email().required(),
        mobile : Joi.required(),
        address : Joi.required(),
        city : Joi.string().alphanum().required(),
        level : Joi.string().alphanum().required(),
        session : Joi.string().required(),
        course : Joi.string().alphanum().required()
    }
}