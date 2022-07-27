const {Router} = require('express');
const {search} = require('../controllers/search');
const { validateCollection } = require('../middlewares');
const router = Router();

router.get('/:collection/:key', validateCollection, search);

//hacer ruta que me permita buscar todos los productos que pertenecen a una determinada categoria
//en mongoDB Compass puedo filtrar por: {category: ObjectId('62cdd4af1cd42510c082e270')} en el documento de productos

module.exports = router;