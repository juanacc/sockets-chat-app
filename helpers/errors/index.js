const {badRequest, internalServerError} = require('../response/index');

exports.userExist = 'The email is already registered';
exports.nameError = 'Name is required';
exports.categoryError = 'Category is required';
exports.emailError = 'The email is required';
exports.passwordError = 'The password is required';
exports.roleError =  role => internalServerError(`The role ${role} is not valid`);
exports.requestError = errorsArr => badRequest(errorsArr); 
exports.valueAlreadyExists = key => `The ${key} already exists`,
exports.idError = 'The ID is not valid';
exports.loginError = 'Incorrect username or password';
exports.userDeleted = 'User deleted or blocked';
exports.generateTokenError = 'Failed to generate token';
exports.missingToken = 'There is no token in the request';
exports.missingFile = 'No files were uploaded';
exports.invalidToken = 'Invalid token';
exports.invalidExtension = validExtension => `Invalid file extension. Allowed extensions are: ${validExtension}`;
exports.nonexistentUser = 'Nonexistent user';
exports.nonexistentCategory = 'Nonexistent category';
exports.invalidRole = 'The user does not have the corresponding role';
exports.idTokenGoogleRequired = 'Google id_token is required';
exports.googleTokenError = 'Google token could not be verified';
exports.collectionError = collections => `The allowed collections are ${collections}`;