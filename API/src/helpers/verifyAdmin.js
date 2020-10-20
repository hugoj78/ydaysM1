
const jwt = require('jsonwebtoken');
const configs = require('../configs/jwt.config');

function verifyAdmin(req, res, next) {

    let token = req.headers['x-access-token'];

    if(!token) {
        return res.status(400).send({
            auth: false,
            message: 'missing token'
        })
    }
    jwt.verify(token, configs.secret, (err, decoded) => {
        if(decoded == undefined || !decoded.admin) {
            if (!res.headersSent) {
                res.status(403).send({
                    auth: false,
                    message: 'access forbidden'
                })
            }
            req.userId = decoded.id;
            req.admin = decoded.admin;
        }
    });

    next();
}

module.exports = verifyAdmin;