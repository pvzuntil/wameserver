const utils = require('../lib/util')
const KontakModel = require('../model/kontak.model')
const validation = require('../validation/validation')

const kontakRouter = require('express').Router()

kontakRouter.get('/all', async (req, res) => {
    const session = req.currentUser
    try {
        const getData = await KontakModel.find({
            $and: [
                {
                    idUser: session.id
                },
                {
                    deletedAt: null
                }
            ]
        })

        if (getData.length == 0) {
            return res.send(utils.response(0, 'kontak anda kosong'))
        }
        return res.send(utils.response(1, 'berhasil', {
            kontak: getData
        }))

    } catch (error) {
        return res.send(utils.responseError(error.message))
    }
})

kontakRouter.post('/one', async (req, res) => {
    const data = req.body
    const checkValidate = utils.validateReq(data, validation.only.id)
    if (checkValidate) {
        return res.send(utils.responseError(utils.getJoiMessage(checkValidate)))
    }

    try {
        const getData = await KontakModel.findById(data.id)

        if (!getData) {
            return res.send(utils.response(0, 'data tidak ditemukan'))
        }
        return res.send(utils.response(1, 'berhasil', {
            kontak: getData
        }))

    } catch (error) {
        return res.send(utils.responseError(error.message))
    }
})

kontakRouter.post('/create', async (req, res) => {
    const session = req.currentUser
    const data = req.body
    let checkValidation = utils.validateReq(data, validation.create.kontak)
    if (checkValidation) {
        return res.send(utils.responseError(utils.getJoiMessage(checkValidation)))
    }

    try {
        let dataCreate = KontakModel({
            name: data.name,
            no: data.no,
            idUser: session.id
        })

        let saveKontak = await dataCreate.save()

        return res.send(utils.response(1, 'berhasil menyimpan kontak', {
            kontak: saveKontak
        }))
    } catch (error) {
        return res.send(utils.responseError(error.message))
    }
})

kontakRouter.delete('/delete', async (req, res) => {
    const data = req.body
    const checkValidate = utils.validateReq(data, validation.only.id)
    if (checkValidate) {
        return res.send(utils.responseError(utils.getJoiMessage(checkValidate)))
    }

    try {
        await KontakModel.findByIdAndUpdate(data.id, {
            deletedAt: Date.now()
        })

        return res.send(utils.response(1, 'berhasil menghapus kontak'))
    } catch (error) {
        return res.send(utils.responseError(error.message))
    }
})

module.exports = kontakRouter