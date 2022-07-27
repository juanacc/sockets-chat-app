const helpErrors = require('../helpers/errors');
const helpValidators = require('../helpers/validators');
const helResponse = require('../helpers/response');
const helpJWT = require('../helpers/jwt');
const helpGoogle = require('../helpers/google/google-verify');
const helpEncryptPassword = require('../helpers/encryptPassword');
const helpValidNames = require('../helpers/validNames');
const helpUploadFiles = require('../helpers/uploadFiles');

module.exports = {
    ...helpErrors,
    ...helpValidators,
    ...helResponse,
    ...helpJWT,
    ...helpGoogle,
    ...helpEncryptPassword,
    ...helpValidNames,
    ...helpUploadFiles,
}