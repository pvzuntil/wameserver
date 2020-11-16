const utils = require('../lib/util')
const KontakModel = require('../model/kontak.model')
const validation = require('../validation/validation')

const kontakRouter = require('express').Router()

kontakRouter.get('/all', async (req, res) => {
    const session = req.currentUser
    try {
        const getData = await KontakModel.find({
            idUser: session.id
        })

        if (getData.length == 0) {
            return res.send(utils.response(0, 'kontak anda kosong'))
        }
        return res.send(utils.response(1, 'berhasil', {
            list: getData
        }))

    } catch (error) {
        return res.send(utils.responseError(error.message))
    }
})

kontakRouter.post('/create', async (req, res)=>{
    const session = req.currentUser
    const data = req.body
    let checkValidation = utils.validateReq(data, validation.create.kontak)
    if(checkValidation){
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

module.exports = kontakRouter