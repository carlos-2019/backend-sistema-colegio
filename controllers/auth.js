const {response} = require('express');
const Alumno = require('../models/alumno');
const Profesor = require('../models/profesor');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');

const login = async (req, res = response) => {
    
    const {dni, password} = req.body;

    try {
        // VERIFICAR EL DNI POR ALUMNO - EL LET LO HACE MODIFICABLE
        let usuarioDB = await Alumno.findOne({ dni });

        if (!usuarioDB) {
            // SI NO ENCUENTRA ESE DNI EN EL ALUMNO BUSCA POR PROFESOR
            usuarioDB = await Profesor.findOne({ dni });
            if (!usuarioDB) {
                // SI NO ENCUENTRA RETORNA UN ERROR 404
                return res.status(404).json({
                ok: false,
                mensaje: 'Dni no valido'
                });
            }
        }

        // VERIFICAR CONTRASEÑA
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Password no valido'
            });
        }

        // GENERAR EL TOKEN
        const token = await generarJWT(usuarioDB._id);
        res.status(200).json({
            ok: true,
            token: token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Hable con el administrador'
        });
    }
}

// PARA RENOVAR EL TOKEN
const newToken = async (req, res = response) => {
    const uid = req.uid;

    // GENERAR EL TOKEN
    const token = await generarJWT(uid);

    res.json({
        ok: true,
        token
    });
}

module.exports = {
    login,
    newToken
}