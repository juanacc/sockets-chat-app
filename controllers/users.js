const {response, request} = require('express');
const {encryptPassword} = require('../helpers/encryptPassword');
const {
  success,
} = require('../helpers');
const userService = require('../services/users');

exports.getUsers = async (req = request, res = response) => {
  const {from = 0, limit = 5} = req.query;
  
  // const [total, users] = await Promise.all([
  //   User.count({state: true}),
  //   User.find({state: true}).skip(from).limit(limite)
  // ]);
  
  const users = await userService.get(from,limit, {state: true});
  res.json(success({total: users.length, users: users}));
};

exports.postUsers = async (req, res = response) => {
  const {google, ...userData} = req.body;
  //Encriptar password
  userData.password = encryptPassword(userData.password);
  //Crear usuario
  const user = await userService.create(userData);
  res.json(success(user));
};

exports.putUsers = async (req, res = response) => {
  const id = req.params.id;
  const {_id, password, google, email, ...data} = req.body;
  if(password){
    data.password = encryptPassword(password);
  }
  const updatedUser = await userService.update(id, data);
  res.json(success(updatedUser));
};

exports.patchUsers = (req, res = response) => {
  res.json({
    msg: 'patch API - controller'
  });
};

exports.deleteUser = async (req, res = response) => {
  //Se hace una eliminacion logica
  const {id} = req.params;
  const deletedUser = await userService.update(id, {state: false});
  res.json({
    deletedUser
  });
};