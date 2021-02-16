const {Schema, model} = require('mongoose');

const MatriculaSchema = Schema({

    codigo:{
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: Boolean,
        default: true
    },
    alumno:{
        type: Schema.Types.ObjectId,
        ref: 'Alumno',
        required: true
    },
    curso: [{
            type: Schema.Types.ObjectId,
            ref: 'Curso',
            required: true
    }],
    grado: {
        type: Schema.Types.ObjectId,
        ref: 'Grado',
        required: true
    },
    semestre: {
        type: Schema.Types.ObjectId,
        ref: 'Semestre',
        required: true
    }

}, {
    collection: 'matricula'
});

module.exports = model('Matricula', MatriculaSchema);