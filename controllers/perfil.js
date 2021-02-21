const { response } = require('express');
const Alumno = require('../models/alumno');
const Profesor = require('../models/profesor');


const detalle = async (req, res = response) => {

    const uid = req.params.id;

    try {

        let usuarioDB = await Alumno.findById(uid);

    if (!usuarioDB) {
        usuarioDB = await Profesor.findById(uid);
        if (!usuarioDB) {
            // SI NO ENCUENTRA RETORNA UN ERROR 404
            return res.status(404).json({
            ok: false,
            mensaje: 'No existe el usuario'
            });
        }
    }

    res.status(200).json({
        ok: true,
        perfil: usuarioDB
    });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Hable con el administrador'
        });
    }
}

module.exports = {
    detalle
}