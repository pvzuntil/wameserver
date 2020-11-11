const express = require('express');
const mongoose = require('mongoose');
const utils = require('./lib/util');
const app = express()
const dotenv = require('dotenv');
const authRouter = require('./route/authRouter');

dotenv.config()

mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Database Active!');

});

app.use(express.json())

app.get('/', (req, res) => {
    return res.send(utils.response(12, 'masukkkk'))
});
app.use('/auth', authRouter)

app.listen(3000, () => {
    console.log('Server Runing!');
})