const { response } = require('express');
const Grado = require('../models/grado');

const cargarGrado = async (req, res = response) =>{

    const desde = Number(req.query.desde) || 0;
    const [grado, total] = await Promise.all([

        Grado.find({}, 'nombre estado')
                .skip(desde)
                .limit(5),
        Grado.countDocuments()
    ]);

    res.status(200).json({
        ok: true,
        grado: grado,
        total: total
    });
}

const crearGrado = async (req, res = response) => {

    const grado = new Grado({
        ...req.body
    });

    try {
        
        const gradoDB = await grado.save();
        
        res.status(201).json({
            ok: true,
            grado: gradoDB
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: 'Error inesperado, Hable con el administrador'
        });
    }
}

module.exports = {
    cargarGrado,
    crearGrado
}