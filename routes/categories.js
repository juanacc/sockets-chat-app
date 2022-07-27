const {Router} = require('express');
const {getCategories, getCategory, postCategory, putCategory, deleteCategory} = require('../controllers/categories');
const {
    isAuthenticate,
    validateCategoryCreation,
    isAdmin,
    validateCategoryById,
    validateCategoryUpdate,
    validateActiveCategory
} = require('../middlewares');

const router = Router();

router.get('/', getCategories);

router.get('/:id', [validateCategoryById, validateActiveCategory], getCategory);

router.post('/', [isAuthenticate, validateCategoryCreation], postCategory);

// Actualizar categoria por id - cualquier usuario con un token valido - validar id - validar nombre de categoria
router.put('/:id', [isAuthenticate, validateActiveCategory, validateCategoryUpdate], putCategory);

router.delete('/:id', [isAuthenticate, isAdmin, validateCategoryById], deleteCategory);

module.exports = router;