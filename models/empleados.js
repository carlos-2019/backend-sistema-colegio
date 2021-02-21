const {Schema, model} = require('mongoose');

const EmpleadoShema = Schema({
    
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true,
        unique: true
    },
    fecha_nacimiento: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    domicilio: {
        type: String,
        required: true
    },
    telefono:{
        type: String
    },
    celular: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    area: {
        type: Schema.Types.ObjectId,
        ref: 'Area',
        required: true
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        default: 'PERSONAL_ROLE'
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Empleado', EmpleadoShema);