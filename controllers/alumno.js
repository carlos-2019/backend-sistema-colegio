const { response } = require('express');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');
const Alumno = require('../models/alumno');

const cargarAlumnos = async (req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    const [alumno, total] = await Promise.all([
        Alumno
            .find({}, 'nombre apellido dni email img role estado')
            .skip(desde)
            .limit(5),
        Alumno.countDocuments()
    ]);

    res.status(200).json({
        ok: true,
        alumnos: alumno,
        total: total
    });
}

const crearAlumno = async (req, res = response) => {

    const {dni, password} = req.body;

    try {
        const existeDni = await Alumno.findOne({ dni });

        if (existeDni) {
            return res.status(400).json({
                ok:false,
                mensaje: 'El dni ya esta resgistrado'
            });
        }
        const alumno = new Alumno(req.body);

        // ENCRIPTAR LA CONSTRASEÑA CON HASH DE UNA SOLA VIA
        const passwordEncrip = bcrypt.genSaltSync();
        alumno.password = bcrypt.hashSync(password, passwordEncrip);

        // GUARDAR EL USUARIO
        await alumno.save();

        // GENERANDO TOKEN
        const token = await generarJWT(alumno._id);

        res.status(201).json({
            ok: true,
            alumno: alumno,
            mensaje: 'Creando Alumno',
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

const actualizarAlumno = async (req, res = response) => {

    const uid = req.params.id;

    try {
        const alumnoDB = await Alumno.findById(uid);

        // VERIFICAMOS SI EXISTE EL ALUMNO
        if (!alumnoDB) {
            return res.status(404).json({
                 ok: false,
                 mensaje: 'No existe un Alumno por ese id'
            });
        }

        // PASO LA VERIFICACION
        // PARA NO MOSTRAR CAMPOS QUE NO SE VAN A ACTUALIZAR
        const { password,dni, ...campos } = req.body;
        // SI EL DNI ES DIFERENTE AL QUE SE QUIERE CAMBIAR
        if (alumnoDB.dni !== dni) {
            
            const existeDni = await Alumno.findOne({dni});
            if (existeDni) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Ya existe un alumno con ese dni'
                });
            }
        }

        campos.dni = dni;

        const alumnoActualizado = await Alumno.findByIdAndUpdate(uid, campos, {new: true});

        res.status(200).json({
           ok: true,
           alumno: alumnoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
           ok: false,
           mensaje: 'Error inesperado, Hable con el administrador'
        });
    }
}

// ELIMINACION LOGICA 
const eliminarAlumno = async (req, res = response) => {

    const uid = req.params.id;

    try {
        
        const alumnoDB = await Alumno.findById(uid);
        if (!alumnoDB) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe un usuario por ese id'
            });
        }

        const alumnoActualizado = await Alumno.findByIdAndUpdate(uid, {estado: false}, {new: true});
        res.status(200).json({
           ok: true,
           alumno: alumnoActualizado
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
    cargarAlumnos,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno
}