// const mongoose = require('mongoose');
const mongoose = require('mongoose'); mongoose.set('useCreateIndex', true);


const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};


let Schema = mongoose.Schema;
let usuarioSchema = new Schema({
    nombre:{
        type: String,
        required:[true, 'El nombre es necesario'],
    },
    email:{
        type: String,
        required:[true, 'El email es necesario'],
        unique:true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img:{
        type: String,
        required:false
    },
    role:{
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});

usuarioSchema.plugin( uniqueValidator,{ message: '{PAHT} debe ser unico'});

module.exports = mongoose.model( 'Usuario',usuarioSchema);