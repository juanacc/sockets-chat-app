const {request, response} = require('express');
const {
    success,
    internalServerError,
} = require('../helpers');
const {categoryService} = require('../services');

// paginado, mostrar total, populate
exports.getCategories = async (req = request, res = response) => {
    const {from = 0, limit = 5} = req.query;
    try {
        const categories = await categoryService.getAll(from, limit, {state: true});
        res.status(200).json(success({total: categories.length, categories}));
    } catch (error) {
        console.log(error);
        res.status(500).json(internalServerError(error));
    }
}

// populate, solo regresa el objeto de la categoria
exports.getCategory = async (req = request, res = response) => {
    const {id} = req.params;
    try {
        const category = await categoryService.findById(id);
        res.status(200).json(success(category));
    } catch (error) {
        console.log(error);
        res.status(500).json(internalServerError(error));
    }
}

exports.postCategory = async (req = request, res = response) => {
    const name = req.body.name.toUpperCase();
    const data = {
        name,
        user: req.user._id
    }
    const createdCategory = await categoryService.create(data);
    res.status(201).json(createdCategory);
}

// solo se actualiza el name el cual no debe existir
exports.putCategory = async (req = request, res = response) => {
    const name = req.body.name.toUpperCase(); 
    const id = req.params.id;
    // la categoria se debe actualizar con el usuario due#o del token
    const data = {
        name,
        user: req.user._id
    }
    const updateCategory = await categoryService.update(id, data);
    res.status(200).json(success(updateCategory));
}

// borrado logico
exports.deleteCategory = async (req = request, res = response) => {
    const {id} = req.params;
    const deletedCategory = await categoryService.update(id, {state: false});
    res.status(200).json(success(deletedCategory));
}