const jwt = require('jsonwebtoken')

const auth = function (req, res, next) {
    try {
        let token = req.headers['x-api-key']
        if (!token) {
            res.status(400).send({ err: "you are not login" })
        }
        try {
            let decodedtoken = jwt.verify(token, "secret key")
            req.pass = decodedtoken;
            next()
        } catch (err) {
            return res.status(400).send({ status: false, msg: `${err.message} please check your token` })
        }
    } catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports.auth = auth

