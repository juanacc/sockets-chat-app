const Product = require('../models/product');

exports.findOne = async where => await Product.findOne(where);
exports.getAll = async (from = 0, limit = 1, where) => await Product.find(where).populate('user', 'name').populate('category', 'name').skip(from).limit(limit);
exports.findById = async id => await Product.findById(id).populate('user', 'name').populate('category', 'name');
exports.create = async data => {
    const product = new Product(data);
    return await product.save();
}
exports.update = async (id, data) => await Product.findByIdAndUpdate(id, data, {new: true}); //{new: true} para que me devuelva el objeto actualizado
exports.findAll = async where => await Product.find(where).populate('category', 'name');