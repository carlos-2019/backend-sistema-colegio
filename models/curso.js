const {Schema, model} = require('mongoose');

const CursoSchema = Schema({

    nombre: {
        type: String,
        required: true,
    },
    estado: {
        type: Boolean,
        default: true
    }

}, {
    collection: 'cursos'
});

module.exports = model('Curso', CursoSchema);