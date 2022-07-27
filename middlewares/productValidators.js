const {check} = require('express-validator');
const {
    validateFields,
    nameError,
    idError,
    existCategoryById,
    existProductById,
    existActiveProduct,
    existProductName,
} = require('../helpers');

exports.validateProductById = [
    check('id', idError).isMongoId(),
    check('id').custom(existProductById),
    validateFields
]

exports.validateProductCreation = [
    check('name', nameError).not().isEmpty(),
    check('name').custom(existProductName),
    check('category', idError).isMongoId(),
    check('category').custom(existCategoryById),
    validateFields
];

exports.validateActiveProduct = [
    check('id', idError).isMongoId(),
    check('id').custom(existActiveProduct),
    validateFields
]

// SI SE ACTUALIZA LA CATEGORIA DE UN PRODUCTO, SE DEBE VALIDAR QUE SEA CORRECTA
exports.validateProductUpdate = [
    check('id', idError).isMongoId(),
    check('id').custom(existProductById),
    //si viene la categoria, validarla
    check('name').custom(existProductName),
    validateFields
]