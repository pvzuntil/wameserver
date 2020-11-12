const utils = require('../lib/util')
const UserModel = require('../model/user.model')
const validation = require('../validation/validation')
const bcrypt = require('bcrypt')
const authRouter = require('express').Router()
const jwt = require('jsonwebtoken')

authRouter.post('/login', async (req, res) => {
    const data = req.body
    utils.validateReq(res, data, validation.login)

    try {
        let getUser = await UserModel.findOne({
            email: data.email
        })

        if (!getUser) {
            throw new Error('email dan password anda salah, silahkan coba lagi')
        }

        let checkPass = await bcrypt.compare(data.password, getUser.password)
        if (!checkPass) {
            throw new Error('email dan password anda salah, silahkan coba lagi')
        }

        const token = jwt.sign({
            name: getUser.name,
            email: getUser.email,
            id: getUser._id
        }, process.env.JWT_SECRET)

        return res.send(utils.response(1, 'berhasil masuk', {
            user: getUser,
            token
        }))
    } catch (e) {
        return res.send(utils.responseError(e.message))
    }
})

authRouter.post('/signin', async (req, res) => {
    const data = req.body
    utils.validateReq(res, data, validation.signin)

    try {
        let getUser = await UserModel.findOne({
            email: data.email
        })

        if (getUser) {
            throw new Error('email sudah terdaftar, silahkan coba lagi')
        }

        let saltBcrypt = await bcrypt.genSalt(10)
        let hashPass = await bcrypt.hash(data.password, saltBcrypt)

        const dataUser = UserModel({
            name: data.name,
            email: data.email,
            password: hashPass
        })

        let saveUser = await dataUser.save()
        return res.send(utils.response(1, 'berhasil mendaftar, silahkan masuk untuk melanjutkan', {
            user: saveUser
        }))

    } catch (error) {
        return res.send(utils.responseError(error.message))
    }
})

module.exports = authRouter