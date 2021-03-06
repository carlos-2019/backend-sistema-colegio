const {Schema, model} = require('mongoose');

const AlumnoSchema = Schema({
    codigo: {
        type: String,
        required: true,
    },
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
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        default: 'ALUMNO_ROLE'
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Alumno', AlumnoSchema);