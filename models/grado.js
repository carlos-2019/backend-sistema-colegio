const {Schema, model} = require('mongoose');

const GradoSchema = Schema({

    nombre: {
        type: String,
        required: true,
    },
    estado: {
        type: Boolean,
        default: true
    }

}, {
    collection: 'Grados'
});

module.exports = model('Grado', GradoSchema);