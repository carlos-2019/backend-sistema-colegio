const { Router } = require('express');
const {cargarAlumnos, crearAlumno, actualizarAlumno, eliminarAlumno, cargarAlumnoPorId} = require('../controllers/alumno');
const {validadJWT} = require('../middlewares/validar-jwt');
const router = Router();

router.get('/',validadJWT, cargarAlumnos);
router.get('/:id', validadJWT, cargarAlumnoPorId);
router.post('/',validadJWT, crearAlumno);
router.put('/:id',validadJWT, actualizarAlumno);
router.put('/eliminar/:id', eliminarAlumno);

module.exports = router;