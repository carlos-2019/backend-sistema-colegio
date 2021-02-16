const { response } = require('express');
const Curso = require('../models/curso');

const cargarCurso = async (req, res = response) =>{

    const desde = Number(req.query.desde) || 0;
    const [curso, total] = await Promise.all([

        Curso.find({}, 'nombre estado')
                .skip(desde)
                .limit(5),
        Curso.countDocuments()
    ]);

    res.status(200).json({
        ok: true,
        curso: curso,
        total: total
    });

}

const crearCurso = async (req, res = response) => {
    
    const curso = new Curso({
        ...req.body
    });

    try {

        const cursoDB = await curso.save();
        
        res.status(201).json({
            ok: true,
            curso: cursoDB
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
    cargarCurso,
    crearCurso
}