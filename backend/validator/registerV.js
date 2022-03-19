const joi =require("joi");

const registerSchema=joi.object({
    username:joi.string().required(),
    email:joi.string().required().email(),
    mobile:joi.number().required(),
    password:joi.string().required(),
    confirmpassword:joi.string().valid(joi.ref('password')).required(),    
});


module.exports={ registerSchema }