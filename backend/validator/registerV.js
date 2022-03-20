const joi = require("joi");

const userValidation = (data) => {
    const registerSchema = joi.object({
        username: joi.string().required(),
        email: joi.string().required().email(),
        mobile: joi.number().required(),
        password: joi.string().required()
    });
    return registerSchema.validate(data)
}

module.exports = { userValidation }