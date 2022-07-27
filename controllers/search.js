const {request, response} = require('express');
const { success } = require('../helpers');
const {ObjectId} = require('mongoose').Types;
const {categoryService, userService, productService} = require('../services');

// const searchUsers = async (key = '', res = response) => {
//     const isMongoID = ObjectId.isValid(key);
//     if(isMongoID){
//         const user = await userService.findById(key);
//         console.log(user);
//         return res.json({
//             results: (user) ? [user] : []
//         });
//     }
//     const regex = new RegExp(key, 'i');
//     const users = await userService.findAll({
//         $or: [{name: regex}, {email: regex}],
//         $and: [{state: true}]
//     });
//     res.json({
//         total: users.length,
//         results: users
//     });
// }

// const searchCategories = async (key = '', res = response) => {
//     const isMongoID = ObjectId.isValid(key);
//     if(isMongoID){
//         const category = await categoryService.findById(key);
//         return res.json({
//             results: (category) ? [category] : []
//         });
//     }
//     const regex = new RegExp(key, 'i');
//     const categories = await categoryService.findAll({name: regex, state:true});
//     console.log(categories);
//     res.json({
//         total: categories.length,
//         results: categories
//     });
// }

// const searchProducts = async (key = '', res = response) => {
//     const isMongoID = ObjectId.isValid(key);
//     if(isMongoID){
//         const product = await productService.findById(key);
//         return res.json({
//             results: (product) ? [prodcut] : []
//         });
//     }
//     const regex = new RegExp(key, 'i');
//     const products = await productService.findAll({name: regex, state:true});
//     console.log(products);
//     res.json({
//         total: products.length,
//         results: products
//     });
// }

const searchUsers = async (key = '') => {
    const isMongoID = ObjectId.isValid(key);
    if(isMongoID){
        const user = await userService.findById(key);
        return (user) ? [user] : []
    }
    const regex = new RegExp(key, 'i');
    return userService.findAll({
        $or: [{name: regex}, {email: regex}],
        $and: [{state: true}]
    });
}

const searchCategories = async (key = '') => {
    const isMongoID = ObjectId.isValid(key);
    if(isMongoID){
        const category = await categoryService.findById(key);
        return (category) ? [category] : [];
    }
    const regex = new RegExp(key, 'i');
    return categoryService.findAll({name: regex, state:true});
    
}

const searchProducts = async (key = '') => {
    const isMongoID = ObjectId.isValid(key);
    if(isMongoID){
        const product = await productService.findById(key);
        return (product) ? [product] : [];
    }
    
    const regex = new RegExp(key, 'i');
    return productService.findAll({name: regex, state:true});
}

exports.search = async (req = request, res = response) => {
    const {collection, key} = req.params;
    // switch(collection) {
    //     case 'users':
    //         searchUsers(key, res);
    //         break;
    //     case 'categories':
    //         searchCategories(key, res);
    //         break;
    //     case 'products':
    //         searchProducts(key, res);
    //         break;
    // }

    // para evitar hacer el switch
    const searchCollections = {
        users: searchUsers(key),
        categories: searchCategories(key),
        products: searchProducts(key), 
    }

    const result = await searchCollections[collection];
    res.json(success({
        total: result.length,
        result
    }))
}