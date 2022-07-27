const authValidators = require('../middlewares/authValidators');
const userValidators = require('../middlewares/userValidations');
const categoryValidators = require('../middlewares/categoryValidators');
const productValidators = require('../middlewares/productValidators');
const searchValidators = require('../middlewares/searchValidators');
const uploadValidators = require('../middlewares/uploadValidators');

module.exports = {
    ...authValidators,
    ...userValidators,
    ...categoryValidators,
    ...productValidators,
    ...searchValidators,
    ...uploadValidators,
}
