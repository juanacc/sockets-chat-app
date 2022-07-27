const Category = require('../models/category');

exports.findOne = async where => await Category.findOne(where);

exports.create = async data => {
    const category = new Category(data);
    return await category.save();
}

exports.getAll = async (from = 0, limit = 1, where) => await Category.find(where).populate('user', 'name').skip(from).limit(limit);
exports.findById = async id => await Category.findById(id).populate('user', 'name');
exports.update = async (id, data) => await Category.findByIdAndUpdate(id, data, {new: true}); //{new: true} para que me devuelva el objeto actualizado
exports.findAll = async where => await Category.find(where);