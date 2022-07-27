const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
      type: String,
      required: [true, 'The name is required'],
    },
    email: {
      type: String,
      required: [true, 'The email is required'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'The password is required']
    },
    img: {
      type: String
    },
    role: {
      type: String,
      required: [true, 'The role is required'],
      enum: ['USER_ROLE', 'ADMIN_ROLE']
    },
    state: {
      type: Boolean,
      default: true
    },
    google: {
      type: Boolean,
      default: false
    }
});

//cuando se llama al modelo o este se quiere imprimir se llama a un metodo que es el .toJSON, entonces se puede sobreescribir el metodo toJSON para devolver lo que quiero
//cada vez que se llama al modelo
UserSchema.methods.toJSON = function(){//se usa una funcion normal porque tengo que hacer referencia al this, lo cual con una funcion flecha no seria posible
  const {__v, password, _id, ...user} = this.toObject();
  user.uid = _id;
  return user;
}

module.exports = model('User', UserSchema); // Mongoose al crear la coleccion le agrega una pluralizacion al nombre de la coleccion
