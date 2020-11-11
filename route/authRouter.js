const utils = require('../lib/util')
const UserModel = require('../model/user.model')
const validation = require('../validation/validation')
const bcrypt = require('bcrypt')
const authRouter = require('express').Router()
const jwt = require('jsonwebtoken')

authRouter.post('/login', async(req, res) => {
    const data = req.body
    utils.validateReq(res, data)

    try{
        let getUser = await UserModel.findOne({
            email: data.email
        })

        if(!getUser){
            throw new Error('email dan password anda salah, silahkan coba lagi') 
        }

        let checkPass = bcrypt.compare(data.password, getUser.password)
        if(!checkPass){
            throw new Error('email dan password anda salah, silahkan coba lagi') 
        }

        const token = jwt.sign(getUser, process.env.JWT_SECRET)

        return res.send(utils.response(1, 'berhasil masuk', {
            user: getUser,
            token
        }))
    }catch(e){
        return res.send(utils.responseError(e.message))
    }
})

authRouter.post('/signin', ()=>{
    
})

module.exports = authRouter