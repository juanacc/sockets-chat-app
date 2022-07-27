const jwt = require('jsonwebtoken');
const {generateTokenError} = require('../errors');

exports.generateJWT = uid => {
    return new Promise((resolve, reject) => {
        const payload = {uid};
        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '2h'}, (err, token) => {
            if(err){
                console.log(err);
                reject(generateTokenError);
            }
            else{
                resolve(token);
            }
        })
    })
}

exports.verifyToken = token => jwt.verify(token, process.env.JWT_SECRET);