const jwt = require('jsonwebtoken');
const {userService} = require('../../services');
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

exports.validateJWT = async (token = '') => {
    try {
        if(token.length < 10){
            return null;
        }
        const {uid} = this.verifyToken(token);
        const user = await userService.findById(uid);
        return (user && user.state) ? user : null;
        
    } catch (error) {
        return null;
    }
}

exports.verifyToken = token => jwt.verify(token, process.env.JWT_SECRET);