const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');
const Empleados = require('../models/empleados');

const cargarEmpleados = async (req = request, res = response) => {

    const desde = Number(req.query.desde) || 0;
    const [empleado, total] = await Promise.all([
        Empleados
            .find({}, 'nombre apellido dni email img role estado')
            .populate('area', 'nombre')
            .skip(desde)
            .limit(5),
        Empleados.countDocuments()
    ]);

    res.status(200).json({
        ok: true,
        empleados: empleado,
        total: total
    });
}

const cargarEmpleadoPorId = async (req = request, res = response) => {

    const uid = req.params.id;

    try {
        const empleadoDB = await Empleados.findById(uid);

        if (!empleadoDB) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe un empleado con ese id'
            });
        }

        res.status(200).json({
            ok: true,
            empleado: empleadoDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error inesperado hable con el Administrador revisar log'
        });
    }
}

const crearEmpleados = async (req = request, res = response) => {

    const {dni, password} = req.body;

    try {
        const existeDni = await Empleados.findOne({ dni });

        if (existeDni) {
            return res.status(400).json({
                ok:false,
                mensaje: 'El dni ya esta resgistrado'
            });
        }
        const empleado = new Empleados(req.body);

        // ENCRIPTAR LA CONSTRASEÑA CON HASH DE UNA SOLA VIA
        const passwordEncrip = bcrypt.genSaltSync();
        empleado.password = bcrypt.hashSync(password, passwordEncrip);

        // GUARDAR EL USUARIO
        await empleado.save();

        // GENERANDO TOKEN
        const token = await generarJWT(empleado._id);

        res.status(201).json({
            ok: true,
            empleado: empleado,
            mensaje: 'Creando Empleado',
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

const actualizarEmpleados = async (req = request, res = response) => {
    const uid = req.params.id;

    try {
        const empleadoDB = await Empleados.findById(uid);

        // VERIFICAMOS SI EXISTE EL ALUMNO
        if (!empleadoDB) {
            return res.status(404).json({
                 ok: false,
                 mensaje: 'No existe un Empleado por ese id'
            });
        }

        // PASO LA VERIFICACION
        // PARA NO MOSTRAR CAMPOS QUE NO SE VAN A ACTUALIZAR
        const { password,dni, ...campos } = req.body;
        // SI EL DNI ES DIFERENTE AL QUE SE QUIERE CAMBIAR
        if (empleadoDB.dni !== dni) {
            
            const existeDni = await Empleados.findOne({dni});
            if (existeDni) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Ya existe un Empleado con ese dni'
                });
            }
        }

        campos.dni = dni;

        const empleadoActualizado = await Empleados.findByIdAndUpdate(uid, campos, {new: true});

        res.status(200).json({
           ok: true,
           empleado: empleadoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
           ok: false,
           mensaje: 'Error inesperado, Hable con el administrador'
        });
    }
}

const eliminarEmpleados = async (req = request, res = response) => {

    const uid = req.params.id;

    try {
        
        const empleadoDB = await Empleados.findById(uid);
        if (!empleadoDB) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe un empleado por ese id'
            });
        }

        const empleadoActualizado = await Empleados.findByIdAndUpdate(uid, {estado: false}, {new: true});
        res.status(200).json({
           ok: true,
           alumno: empleadoActualizado
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
    cargarEmpleados,
    cargarEmpleadoPorId,
    crearEmpleados,
    actualizarEmpleados,
    eliminarEmpleados
}