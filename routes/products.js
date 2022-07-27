const {Router} = require('express');
const {getProducts, getProduct, postProduct, putProduct, deleteProduct} = require('../controllers/products');
const {
    isAuthenticate,
    validateProductCreation,
    validateProductById,
    validateActiveProduct,
    validateProductUpdate,
    isAdmin,
} = require('../middlewares');

const router = Router();

router.get('/', getProducts);
router.get('/:id', [validateProductById, validateActiveProduct], getProduct);
router.post('/', [isAuthenticate, validateProductCreation], postProduct);
router.put('/:id', [isAuthenticate, validateActiveProduct, validateProductUpdate], putProduct);
router.delete('/:id', [isAuthenticate, isAdmin, validateProductById], deleteProduct);

module.exports = router;