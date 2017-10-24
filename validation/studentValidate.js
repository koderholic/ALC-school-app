const Joi = require('joi');

module.exports = {
    body :   {
        firstname : Joi.string().required(),
        middlename : Joi.string().required(),
        lastname : Joi.string().required(),
        gender : Joi.number().integer(),
        date_of_birth : Joi.required(),
        email : Joi.string().email().required(),
        mobile : Joi.required(),
        address : Joi.required(),
        postal : Joi.string(),
        city : Joi.string().alphanum().required(),
        class : Joi.string().alphanum().required(),
        session : Joi.string().required(),
        courses : Joi.string().alphanum().required()
    }
}