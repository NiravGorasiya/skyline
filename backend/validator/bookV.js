const joi =require("joi");

const bookSchema=joi.object({
    name:joi.string().required(),
    author:joi.string().required(),
    title:joi.string().required(),
    rating:joi.number().required()
});


module.exports={ bookSchema }