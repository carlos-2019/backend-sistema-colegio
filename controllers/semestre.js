const { response } = require('express');
const Semestre = require('../models/semestre');

const cargarSemestre = async (req, res = response) =>{

    const desde = Number(req.query.desde) || 0;
    const [semestre, total] = await Promise.all([

        Semestre.find({}, 'nombre estado')
                .skip(desde)
                .limit(5),
        Semestre.countDocuments()
    ]);

    res.status(200).json({
        ok: true,
        semestre: semestre,
        total: total
    });
}

const crearSemestre = async (req, res = response) => {

    const semestre = new Semestre({
        ...req.body
    });

    try {
        
        const semestreDB = await semestre.save();

        res.status(201).json({
            ok: true,
            semestre: semestreDB
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
    cargarSemestre,
    crearSemestre
}