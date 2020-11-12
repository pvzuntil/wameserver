const Joi = require('@hapi/joi')
const validation = {
    login: (data) => {
        return Joi.object({
            email: Joi.string().required().email(),
            password: Joi.string().required()
        }).validate(data)
    },
    signin: (data) => {
        return Joi.object({
            name: Joi.string().required().min(3),
            email: Joi.string().required().email(),
            password: Joi.string().required().min(6)
        }).validate(data)
    }
}

module.exports = validation