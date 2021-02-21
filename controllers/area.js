const {request, response} = require('express');
const Area = require('../models/area');

const cargarArea = async (req = request, res = response) => {

    const area = await Area.find();

    res.status(200).json({
        ok: true,
        area: area
    });

}

const crearArea = async (req = request, res = response) => {

    const area = new Area({
        ...req.body
    });

    try {

        const areaDB = await area.save();

        res.status(201).json({
            ok: true,
            area: areaDB
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
    cargarArea,
    crearArea
}