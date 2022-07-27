const Role = require('../models/role');

exports.find = async role => await Role.findOne({role});