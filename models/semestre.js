const {Schema, model} = require('mongoose');

const SemestreSchema = Schema({

    nombre: {
        type: String,
        required: true,
    },
    estado: {
        type: Boolean,
        default: true
    }

}, {
    collection: 'semestres'
});

module.exports = model('Semestre', SemestreSchema);