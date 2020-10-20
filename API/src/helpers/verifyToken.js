const jwt = require('jsonwebtoken');
const configs = require('../configs/jwt.config');

function verifyToken(req, res, next) {
    // First step: get token
    let token = req.headers['x-access-token'];
    // Second step: check token 
    if(!token) {
        return res.status(400).send({
            auth: false,
            message: 'missing token'
        })
    }
    jwt.verify(token, configs.secret, function(err, decoded){
        if(err) {
            return res.status(401).send({
                auth: false,
                message: 'invalid token'
            })
        }
        req.userId = decoded.id;
        req.admin = decoded.admin;
    });
    // Third step: next step --------> WASS LA MENACE
    next();
}

module.exports = verifyToken;