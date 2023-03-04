const authorModel = require('../models/AuthorModel')
const jwt = require('jsonwebtoken')

const createAuthor = async function (req, res) {
    try {
        let body = req.body
        
        let alphabets = /^[A-Z][A-Za-z]{3,20}$/
        let passValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$/
        let emailValid = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/ 
          
        if (Object.keys(body).length === 0) {
            return res.status(400).send({ status: false, msg: "You have not provided any data" })
        }
        if (!body.fname) {
            return res.status(400).send({ status: false, msg: "Please provide fname. it's mandatory" })
        }
        if (!alphabets.test(body.fname)) {
            return res.status(400).send({ status: false, msg: "fname must contain only letters and first letter is capital" })
        }
        if (!body.lname) {
            return res.status(400).send({ status: false, msg: "Please provide lname. it's mandatory" })
        }
        if (!alphabets.test(body.lname)) {
            return res.status(400).send({ status: false, msg: "lname must contain only letters and first letter is capital" })
        }
        if (!body.title) {
            return res.status(400).send({ status: false, msg: "Please provide title. it's mandatory" })
        }
        if (!body.title.match(/Mr|Miss|Mrs/)) {
            return res.status(400).send({ status: false, msg: "Title can have only Mr or Miss or Mrs" })
        }
        if (!body.email) {
            return res.status(400).send({ status: false, msg: "Please provide email" })
        }
        if (!emailValid.test(body.email)) {
            return res.status(400).send({ status: false, msg: "Enter valid email" })
        }
        let author = await authorModel.findOne({ email: body.email })
        if (author) {
            return res.status(400).send({ status: false, msg: "this email is already exist" })
        }
        if (!body.password) {
            return res.status(400).send({ status: false, msg: "Please provide password" })
        }
        if (!passValid.test(body.password)) {
            return res.status(400).send({ status: false, msg: "Enter valid password" })
        }
        let authorData = await authorModel.create(req.body)
        res.status(201).send(authorData)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const authorlogin = async function (req, res) {
    try {
        let useraName = req.body.email;
        let password = req.body.password;
        if (!useraName) {
            return res.status(400).send({ status: false, msg: "Please provide email" })
        }
        if (!password) {
            return res.status(400).send({ status: false, msg: "Please provide password" })
        }
        let authorDetails = await authorModel.findOne({ email: useraName, password: password })
        if (!authorDetails) {
            return res.status(401).send({ status: false, error: "Emaild or the password is not correct" })
        }
        let token = jwt.sign(
            {
                authorId: authorDetails._id.toString(),
                fristBlog: "the moutain"
            }, "secret key")
        res.setHeader('x-api-key', token)
        res.status(200).send({ status: true, token: token });
    } catch (err) {
        res.status(500).send(err.message)
    }
}


module.exports.createAuthor = createAuthor
module.exports.authorlogin = authorlogin

