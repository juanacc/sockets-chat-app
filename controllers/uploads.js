const {response} = require('express');
const {success, uploadFile, internalServerError, getImgPath, getDefaultImgPath, uploadFileBkp, deleteCloudinaryFile} = require('../helpers');
const fs = require('fs');

exports.uploadFiles = async (req, res = response) => {
    try {
        const {file} = req.files;
        await uploadFile(file, 'images');
        res.status(200).json(success({msg: 'File uploaded successfully'}));
    } catch (error) {
        console.log(error);
        res.status(500).json(internalServerError(error));
    }
}

// Para subir imagenes al servidor
exports.updateImageBkp = async (req, res = response) => {
    try {
        const {collection} = req.params;
        const {file} = req.files;    
        model = req.object;

        if(model.img){
            const imgPath = getImgPath(collection, model.img);
            if(fs.existsSync(imgPath))
                fs.unlinkSync(imgPath);
        }

        model.img = await uploadFile(file, collection);
        model.save();
        res.status(200).json(success(model));
    } catch (error) {
        console.log(error);
        res.status(500).json(internalServerError(error));    
    }
}

// Para subir imagenes a Cloudinary
exports.updateImage = async (req, res = response) => {
    try {
        const {file} = req.files;    
        model = req.object;

        if(model.img){
            const nameArr = model.img.split('/');
            const name = nameArr[nameArr.length - 1];
            const [public_id] = name.split('.'); //desestructuracion de arrays
            deleteCloudinaryFile(public_id);
        }
        
        const {secure_url} = await uploadFile(file);
        model.img = secure_url;
        await model.save();
        res.status(200).json(success(model));
    } catch (error) {
        console.log(error);
        res.status(500).json(internalServerError(error));    
    }
}

exports.showImageBkp = async (req, res =response) => {
    try {
        const {collection} = req.params;
        model = req.object;
        if(model.img){
            const imgPath = getImgPath(collection, model.img);
            console.log(imgPath);
            if(fs.existsSync(imgPath))
                return res.sendFile(imgPath);
        }
        const defaultImgPath = getDefaultImgPath();
        res.sendFile(defaultImgPath);
    } catch (error) {
        console.log(error);
        res.status(500).json(internalServerError(error))
    }
}

// Falta mostrar la imagen de Cloudinary
exports.showImage = async (req, res =response) => {
    try {
        const {collection} = req.params;
        model = req.object;
        if(model.img){
            const imgPath = getImgPath(collection, model.img);
            if(fs.existsSync(imgPath))
                return res.sendFile(imgPath);
        }
        const defaultImgPath = getDefaultImgPath();
        res.sendFile(defaultImgPath);
    } catch (error) {
        console.log(error);
        res.status(500).json(internalServerError(error))
    }
}