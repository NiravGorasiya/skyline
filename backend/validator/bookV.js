const joi =require("joi");

const bookValidation =(data)=>{
    const bookSchema=joi.object({
        name:joi.string().required(),
        author:joi.string().required(),
        title:joi.string().required(),
        rating:joi.number().required()
    });
    return bookSchema.validate(data)
}

module.exports={ bookValidation }