const utils = require("../lib/util")
const jwt = require('jsonwebtoken')

const middleware = {
    isLogin: (req, res, next) => {
        // return res.send(req.header('auth-token'))
        try {
            const token = req.header('auth-token')
            if(!token){
                throw new Error('auth token not valid')
            }

            const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
            if(!verifyToken){
                throw new Error('auth token not valid')
            }

            req.currentUser = verifyToken
            return next()
        } catch (error) {
            return res.send(utils.response(99, error.message))
        }
    }
}
module.exports = middleware