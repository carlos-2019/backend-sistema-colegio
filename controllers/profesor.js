const { response } = require('express');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');
const Profesor = require('../models/profesor');

const cargarProfesor = async (req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    const [profesor, total] = await Promise.all([
        Profesor
            .find({}, 'nombre apellido dni email role estado')
            .skip(desde)
            .limit(5),
        Profesor.countDocuments()
    ]);

    res.status(200).json({
        ok: true,
        Profesores: profesor,
        total: total
    });
}

const crearProfesor = async (req, res = response) => {

    const {dni, password} = req.body;

    try {
        const existeDni = await Profesor.findOne({ dni });

        if (existeDni) {
            return res.status(400).json({
                ok:false,
                mensaje: 'El dni ya esta resgistrado'
            });
        }
        const profesor = new Profesor(req.body);

        // ENCRIPTAR LA CONSTRASEÑA CON HASH DE UNA SOLA VIA
        const passwordEncrip = bcrypt.genSaltSync();
        profesor.password = bcrypt.hashSync(password, passwordEncrip);

        // GUARDAR EL USUARIO
        await profesor.save();

        // GENERANDO TOKEN
        const token = await generarJWT(profesor._id);

        res.status(201).json({
            ok: true,
            profesor: profesor,
            mensaje: 'Creando profesor',
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error inesperado hable con el Administrador revisar log'
        });
    }
}

const actualizarProfesor = async (req, res = response) => {

    const uid = req.params.id;

    try {
        
        const profesorDB = await Profesor.findById(uid);
        // VERIFICAMOS SI EXISTE EL ALUMNO
        if (!profesorDB) {
            return res.status(404).json({
                 ok: false,
                 mensaje: 'No existe un profesor por ese id'
            });
        }

        // PASO LA VERIFICACION
        // PARA NO MOSTRAR CAMPOS QUE NO SE VAN A ACTUALIZAR
        const { password,dni, ...campos } = req.body;
        // SI EL DNI ES DIFERENTE AL QUE SE QUIERE CAMBIAR
        if (profesorDB.dni !== dni) {
            
            const existeDni = await Profesor.findOne({dni});
            if (existeDni) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Ya existe un profesor con ese dni'
                });
            }
        }

        campos.dni = dni;

        const profesorActualizado = await Profesor.findByIdAndUpdate(uid, campos, {new: true});

        res.status(200).json({
           ok: true,
           alumno: profesorActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
           ok: false,
           mensaje: 'Error inesperado, Hable con el administrador'
        });
    }
}

const eliminarProfesor = async (req, res = response) => {
      
    const uid = req.params.id;

    try {

        const profesorDB = await Profesor.findById(uid);
        if (!profesorDB) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe un usuario por ese id'
            });
        }

        const profesorActualizado = await Profesor.findByIdAndUpdate(uid, {estado: false}, {new: true});
        res.status(200).json({
           ok: true,
           alumno: profesorActualizado
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
    cargarProfesor,
    crearProfesor,
    actualizarProfesor,
    eliminarProfesor
}