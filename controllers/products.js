const {request, response} = require('express');
const {
    success,
    internalServerError,
} = require('../helpers');
const {productService} = require('../services');

// paginado, mostrar total, populate
exports.getProducts = async (req = request, res = response) => {
    const {from = 0, limit = 5} = req.query;
    try {
        const products = await productService.getAll(from, limit, {state: true});
        res.status(200).json(success({total: products.length, products}));
    } catch (error) {
        console.log(error);
        res.status(500).json(internalServerError(error));
    }
}

// populate, solo regresa el objeto de la categoria
exports.getProduct = async (req = request, res = response) => {
    const {id} = req.params;
    try {
        const product = await productService.findById(id);
        res.status(200).json(success(product));
    } catch (error) {
        console.log(error);
        res.status(500).json(internalServerError(error));
    }
}

exports.postProduct = async (req = request, res = response) => {
    const {state, user, ...body} = req.body;
    
    const data = {
        ...body,
        user: req.user._id,
        name: body.name.toUpperCase(),
    }
    const createdProduct = await productService.create(data);
    res.status(201).json(createdProduct);
}

// solo se actualiza el name el cual no debe existir
exports.putProduct = async (req = request, res = response) => { 
    const id = req.params.id;
    const {state, user, ...body} = req.body;
    if(body.name)
        body.name = body.name.toUpperCase();
    // la categoria se debe actualizar con el usuario due#o del token
    body.user = req.user._id;
    const updateProduct = await productService.update(id, body);
    res.status(200).json(success(updateProduct));
}

// borrado logico
exports.deleteProduct = async (req = request, res = response) => {
    const {id} = req.params;
    const deletedProduct = await productService.update(id, {state: false});
    res.status(200).json(success(deletedProduct));
}