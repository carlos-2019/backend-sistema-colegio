const { Router } = require('express');
const { cargarSemestre, crearSemestre } = require('../controllers/semestre');
const {validadJWT} = require('../middlewares/validar-jwt');
const router = Router();

router.get('/', cargarSemestre);
router.post('/',validadJWT ,crearSemestre);

module.exports = router;