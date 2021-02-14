const { Router } = require('express');
const {cargarAlumnos, crearAlumno, actualizarAlumno, eliminarAlumno} = require('../controllers/alumno');
const {validadJWT} = require('../middlewares/validar-jwt');
const router = Router();

router.get('/', cargarAlumnos);
router.post('/',validadJWT, crearAlumno);
router.put('/:id',validadJWT, actualizarAlumno);
router.put('/eliminar/:id',validadJWT, eliminarAlumno);

module.exports = router;