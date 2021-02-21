const {Schema, model} = require('mongoose');

const AreaSchema = Schema({
    nombre: {
        type: String,
        required: true
    }
});

module.exports = model('Area', AreaSchema)