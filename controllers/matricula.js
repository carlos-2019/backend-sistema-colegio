const { response } = require('express');
const Matricula = require('../models/matricula');

const cargarMatricula = async (req, res = response) =>{

    const desde = Number(req.query.desde) || 0;
    const [matricula, total] = await Promise.all([

        Matricula.find({}, 'codigo fecha estado')
                .populate('alumno', 'nombre apellido dni estado')
                .populate('curso', 'nombre')
                .populate('grado', 'nombre')
                .populate('semestre', 'nombre')
                .skip(desde)
                .limit(5),
        Matricula.countDocuments()
    ]);

    res.status(200).json({
        ok: true,
        matricula: matricula,
        total: total
    });
}

const crearMatricula = async (req, res = response) =>{

    const matricula = new Matricula({
        ...req.body
    });

    try {
        
        const matriculaDB = await matricula.save();

        res.status(201).json({
            ok: true,
            matricula: matriculaDB
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: 'Error inesperado, Hable con el administrador'
        });
    }
}

const actualizarMatricula = async (req, res = response) => {

    const uid = req.params.id;

    try {
        
        const matriculaDB = await Matricula.findById(uid);
        // VERIFICAR SI EXISTE LA MATRICULA
        if (!matriculaDB) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe una matricula con ese id'
            });
        }
        // ACTUALIZACION
        // PARA NO ACTUALIZAR EL CODIGO
        const {...campos} = req.body;
        const matriculaActualizada = await Matricula.findByIdAndUpdate(uid, campos, {new: true});

        res.status(200).json({
            ok: true,
            matricula: matriculaActualizada
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error inesperado, Hable con el administrador'
        });
    }
}

const eliminarMatricula = async (req, res = response) => {

    const id = req.params.id;

    try {

        const matriculaDB = await Matricula.findById(id);

        // SI NO EXISTE
        if (!matriculaDB) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe una matricula con ese id'
            });
        }

        await Matricula.findOneAndDelete(id);
        res.status(200).json({
            ok: true,
            mensaje: 'Matricula Eliminado'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error inesperado, Hable con el administrador'
        });
    }
}

module.exports = {
    cargarMatricula,
    crearMatricula,
    actualizarMatricula,
    eliminarMatricula
}