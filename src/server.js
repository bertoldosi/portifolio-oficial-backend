const express = require('express');
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
require('dotenv').config()
var cors = require('cors')

const app = express();

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }))


const USER_GMAIL = process.env.USER_GMAIL
const PASS_GMAIL = process.env.PASS_GMAIL

const { info } = require('console');

const PORT = process.env.PORT || 5000;

const user = USER_GMAIL
const pass = PASS_GMAIL

app.use(cors())
app.get('/', (req, res) => {
    res.send('Hello word!')
})

app.post('/send', (req, res) => {
    
    const email = req.body.params.email
    const nome = req.body.params.nome
    const mensagem = req.body.params.mensagem

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

app.listen(PORT, () => console.log(`Servidor escutando na porta ${PORT}...`));