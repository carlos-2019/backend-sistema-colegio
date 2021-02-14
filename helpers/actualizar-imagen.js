const fs = require('fs');
const Alumno = require('../models/alumno');
const Profesor = require('../models/profesor');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        // Borrar la imagen anterior
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async (tipo, id, nombreArchivo) => {
    let pathViejo = '';

    switch (tipo) {
        case 'alumno':
            const alumno = await Alumno.findById(id);
            if (!alumno) {
                console.log('No se encontro al alumno');
                return false;
            }
            pathViejo = `./uploads/alumno/${alumno.img}`
            borrarImagen(pathViejo);

            alumno.img = nombreArchivo;
            await alumno.save();
            return true;
            break;

        case 'profesor':
            const profesor = await Profesor.findById(id);
            if (!profesor) {
                console.log('No se encontro al profesor');
                return false;
            }
            pathViejo = `./uploads/profesor/${profesor.img}`
            borrarImagen(pathViejo);

            profesor.img = nombreArchivo;
            await profesor.save();
            return true;
            break;
    
        default:
            break;
    }
}

module.exports = {
    actualizarImagen
}