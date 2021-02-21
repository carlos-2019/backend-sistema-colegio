const path = require('path');
const fs = require('fs');
const { response, request } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = (req = request, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    // VALIDAD TIPO
    const tiposValidos = ['alumno', 'profesor', 'empleado'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            mensaje: ' No es un alumno, profesor, empleado (tipo)'
        });
    }

    // VALIDAR QUE EXISTA UN ARCHIVO
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No hay ningun archivo'
        });
    }

    // PROCESAR LA IMAGEN QUE LLEGA
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    // OPTENER LA EXTENSION DE LA IMAGEN QUE RECIBIMOS
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // VALIDAR EXTENSION
    const extensionesValida = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValida.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No es una extensión permitida'
        });
    }

    // GENERAR EL NOMBRE DEL ARCHIVO
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // PATH PARA GUARDAR LA IMAGEN
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // MOVER LA IMAGEN
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover la imagen'
            });
        }

        // ACTUALIZAR EN LA BASE DE DATOS
        actualizarImagen(tipo, id, nombreArchivo);

        res.status(200).json({
            ok: true,
            mensaje: 'archivo subido',
            nombreArchivo
        });
    });
}

const retornaImagen = (req = request, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    // IMAGEN POR DEFECTO
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    }else{
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }
}

module.exports = {
    fileUpload,
    retornaImagen
}