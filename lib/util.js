const validation = require("../validation/validation")

const message = {
    required: (label) => `${label} is required`,
    email: (label) => `${label} must be a valid email`,
    empty: (label) => `${label} is not allowed to be empty`,
    min: (label, min) => `${label} length must be at least ${min} characters long`,
    string: (label) => `${label} must be a string`,
    unknow: (label) => `${label} not allowed`,
}

const utils = {
    response: (status, message, data = {}) => {
        return { status, message, data }
    },
    responseError: (message, data = {}) => {
        return utils.response(0, message, data)
    },
    getJoiMessage: (obj) => {
        let error = obj.details[0]
        let finalMessage
        let type = error.type
        let ctx = error.context
        let label = ctx.label

        switch (type) {
            case 'any.required':
                finalMessage = message.required(label)
                break;
            case 'string.empty':
                finalMessage = message.empty(label)
                break;
            case 'string.email':
                finalMessage = message.email(label)
                break;
            case 'string.min':
                let min = ctx.limit
                finalMessage = message.min(label, min)
                break;
            case 'string.base':
                finalMessage = message.string(label)
                break;
            case 'object.unknown':
                finalMessage = message.unknow(label)
                break;
        }
        return finalMessage
    },
    validateReq: (res, data, engine) => {
        const { error } = engine(data)
        if (error) {
            return res.send(utils.responseError(utils.getJoiMessage(error)))
        }
    }
}

module.exports = utils