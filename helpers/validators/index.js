const {validationResult} = require('express-validator');
const {userService, roleService, categoryService, productService} = require('../../services');
const errors = require('../errors');

exports.validateFields = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    console.log('ERRORS: ',err.mapped());
    res.status(400).send(errors.requestError(err.mapped()));
    return;
  }
  next();
};

exports.roleValidator = async (role = '') => {
  const existRole = await roleService.find(role);
  if(!existRole)
    throw new Error(`El rol ${role} es invalido`);
}

exports.existUser = async (email = '') => {
  const existUser = await userService.find(email);
  if(existUser){
    console.log('Existing user', existUser);
    throw new Error(`The user with email ${email} is already registered`);
  }
}

exports.existUserById = async (id) => {
  const existUser = await userService.findById(id);
  if(!existUser){
    throw new Error(`The user with ID ${id} does not exist`);
  }
}

exports.existCategoryById = async id => {
  const existCategory = await categoryService.findById(id);
  if(!existCategory)
    throw new Error(`The category with ID ${id} does not exist`);
}

exports.existCategoryName = async name => {
  const existCategory = await categoryService.findOne({name: name.toUpperCase()});
  if(existCategory)
    throw new Error(`the category named ${name} already exists`);
}

exports.existActiveCategory = async id => {
  const existCategory = await categoryService.findById(id)
  if(!existCategory || !existCategory.state)
    throw new Error(`The category with id ${id} is not active`);
}

exports.existActiveProduct = async id => {
  const existProduct = await productService.findById(id)
  if(!existProduct || !existProduct.state)
    throw new Error(`The product with id ${id} is not active`);
}

exports.existProductById = async id => {
  const existProduct = await productService.findById(id);
  if(!existProduct)
    throw new Error(`The product with ID ${id} does not exist`);
}

exports.existProductName = async name => {
  if(name)
    name = name.toUpperCase();
  const existProduct = await productService.findOne({name});
  console.log('PRODUCTO', existProduct);
  if(existProduct)
    throw new Error(`the product named ${name} already exists`);
}

exports.allowedCollections = (collection, validCollections = []) => {
  const isValid = validCollections.includes(collection);
  if(!isValid){
    throw new Error(`The ${collection} collection is not allowed. The allowed ones are: ${validCollections}`);
  }
  return true;
}