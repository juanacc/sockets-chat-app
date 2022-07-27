const {Schema, model} = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    img: {
        type: String
    }
});

//cuando se llama al modelo o este se quiere imprimir se llama a un metodo que es el .toJSON, entonces se puede sobreescribir el metodo toJSON para devolver lo que quiero
//cada vez que se llama al modelo
ProductSchema.methods.toJSON = function(){//se usa una funcion normal porque tengo que hacer referencia al this, lo cual con una funcion flecha no seria posible
    const {__v, state, ...data} = this.toObject();
    return data;
  }

module.exports = model('Product', ProductSchema);