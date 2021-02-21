const { response } = require('express');

const Alumno = require('../models/alumno');
const Profesor = require('../models/profesor');
const Empleado = require('../models/empleados');

const buscarTodo = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    // PARA REALIZAR UN BUSQUEDA SENSITIVA || PUEDA BUSCAR ASI SEA MAYUSCULA O MINUSCULA
    const regex = RegExp(busqueda, 'i');

    const [alumno, profesor, empleado] = await Promise.all([
        Alumno.find({
            nombre: regex
        }),
        Profesor.find({
            nombre: regex
        }),
        Empleado.find({
            nombre: regex
        })

    ]);
    res.status(200).json({
        ok:true,
        alumno,
        profesor,
        empleado
    });
}


const buscarPorColeccion = async (req, res = response) => {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'alumno':
            data = await Alumno.find({ nombre: regex });
            break;
        case 'profesor':
            data = await Profesor.find({ nombre: regex });
            break;
        case 'empleado':
            data = await Empleado.find({ nombre: regex});
            break;
        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'La tabla tiene que ser alumno/profesor'
            });
    }
    res.json({
        ok: true,
        resultados: data
    });
}

module.exports = {
    buscarTodo,
    buscarPorColeccion
}
