const {check} = require('express-validator');
const { allowedCollections, validateFields } = require('../helpers');

exports.validateCollection = [
    check('collection').custom(c => allowedCollections(c, ['categories', 'products', 'users'])),
    validateFields
]