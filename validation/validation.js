const Joi = require('@hapi/joi')
const validation = {
    login: (data)=>{
        return Joi.object({
            email: Joi.string().required().email(),
            password: Joi.string().required()
        }).validate(data)
    }
}

module.exports = validation