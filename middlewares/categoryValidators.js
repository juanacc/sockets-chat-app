const {check} = require('express-validator');
const {
    validateFields,
    existCategoryById,
    existCategoryName,
    existActiveCategory,
    idError,
    nameError,
} = require('../helpers');

exports.validateCategoryById = [
    check('id', idError).isMongoId(),
    check('id').custom(existCategoryById),
    validateFields
]

exports.validateCategoryCreation = [
    check('name', nameError).not().isEmpty(),
    check('name').custom(existCategoryName),
    validateFields
];

exports.validateCategoryUpdate = [
    check('id', idError).isMongoId(),
    check('id').custom(existCategoryById),
    check('name').custom(existCategoryName),
    validateFields
]

exports.validateActiveCategory = [
    check('id', idError).isMongoId(),
    check('id').custom(existActiveCategory),
    validateFields
]