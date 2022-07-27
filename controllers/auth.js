const {response} = require('express');
const userService = require('../services/users');

const {
    success,
    internalServerError,
    badRequest,
    unAuthorized,
    generateJWT,
    userDeleted,
    googleTokenError,
    googleVerify,
} = require('../helpers');

exports.login = async (req, res = response) => {
    try {
        const {id} = req.user;
        const token = await generateJWT(id);
        res.json(success({token, user: req.user}));
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: internalServerError(error)
        })
    }
}

exports.googleSignIn = async (req, res = response) => {
    const {id_token} = req.body;
    
    try {
        const {name, img_url, email} = await googleVerify(id_token);
        let user = await userService.find(email);
        console.log('EXIST USER', user);
        if(!user){
            //el usuario no existe, por lo cual tengo que crearlo
            const data = {
                name,
                email,
                password: ':P',
                img_url,
                google: true
            }
            user = await userService.create(data);
            console.log('NEW USER', user);
        }

        //si el usuario ya existe, pero su state=false(esta eliminado) no lo dejo autenticarse
        if(!user.state){
            return res.status(401).json(unAuthorized(userDeleted));
        }

        const token = await generateJWT(user.id);

        res.json(success({user, token}));
    } catch (error) {
        console.log(error);
        res.status(400).json(badRequest(googleTokenError));
    }
}