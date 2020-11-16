const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name:{
        type: String
    },
    no: {
        type: String
    },
    idUser: {
        type: mongoose.Types.ObjectId
    },
    deletedAt: {
        type: Date,
        default: null
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

const KontakModel = mongoose.model('kontak', schema)
module.exports = KontakModel