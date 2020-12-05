const express = require('express');
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
require('dotenv').config()
var cors = require('cors')
const app = express();

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))


const USER_GMAIL = process.env.USER_GMAIL
const PASS_GMAIL = process.env.PASS_GMAIL

const { info } = require('console');

const port = 3000

const user = USER_GMAIL
const pass = PASS_GMAIL

app.use(cors())
app.get('/', (req, res) => {
    res.send('Hello word!')
})

app.post('/send', (req, res) => {

    const { nome, email, mensagem } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        secure: false,
        port: 587,
        auth: { user, pass }
    })

    transporter.sendMail({
        from: user,
        to: user,
        replyTo: email,
        subject: nome,
        text: mensagem
    })
        .then(info => { res.send(info) })
        .catch(error => { res.send(error) })
})

app.listen(port, () => console.log(`Servidor escutando na porta ${port}...`));