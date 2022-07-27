const path = require('path');
const {v4: uuidv4} = require('uuid'); // uso el metodo "v4" que viene de uuid y lo renombro a "uuidv4"
const cloudinary = require('cloudinary').v2

cloudinary.config(process.env.CLOUDINARY_URL);

exports.getExtensionFile = file => {
    const splitFile = file.name.split('.');
    return splitFile[splitFile.length - 1];
}

exports.createFileName = file => uuidv4() + '.' + this.getExtensionFile(file);

//Para subir la imagen al servidor
exports.uploadFileBkp = (file, folder = '') => {
    return new Promise((resolve, reject) => {
        const fileName = this.createFileName(file);
        // se arma el path donde quiero colocar el archivo
        // __dirname: apunta a la carpeta que contiene el archivo donde se esta llamando a __dirname, en este caso apunta a la carpeta "controllers"
        // console.log('__dirname', __dirname);
        // console.log('uploadPath', path.join(__dirname, '../uploads/', file.name));
        // si la carpeta "folder" no existe, esta se crea automaticamente dado que configure "createParentPath: true" en el middleware en server.js
        const uploadPath = path.join(__dirname, '../../uploads/', folder, fileName);
        // se mueve el file a la ruta especificada
        file.mv(uploadPath, (err) => {
            if (err) {
                console.log(err)
                reject(err);
            }
            resolve(fileName);
        });
    })
}

exports.uploadFile = async file => {
    const {tempFilePath} = file;
    return await cloudinary.uploader.upload(tempFilePath);
}

exports.getImgPath = (folder, fileName) => path.join(__dirname, '../../uploads', folder, fileName);

exports.getDefaultImgPath = () => path.join(__dirname, '../../assets/no-image.jpg');

exports.deleteCloudinaryFile = public_id => cloudinary.uploader.destroy(public_id); 