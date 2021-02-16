const { Router } = require('express');
const { cargarMatricula, crearMatricula, eliminarMatricula, actualizarMatricula } = require('../controllers/matricula');
const {validadJWT} = require('../middlewares/validar-jwt');
const router = Router();

router.get('/', cargarMatricula);
router.post('/',validadJWT ,crearMatricula);
router.put('/:id',validadJWT, actualizarMatricula);
router.delete('/:id',validadJWT ,eliminarMatricula);
module.exports = router;