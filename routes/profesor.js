const { Router } = require('express');
const { cargarProfesor, crearProfesor, actualizarProfesor, eliminarProfesor } = require('../controllers/profesor');
const { validadJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/', cargarProfesor);
router.post('/', crearProfesor);
router.put('/:id',validadJWT ,actualizarProfesor);
router.put('/eliminar/:id',validadJWT, eliminarProfesor);

module.exports = router;