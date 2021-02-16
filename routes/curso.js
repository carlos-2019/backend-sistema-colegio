const { Router } = require('express');
const { cargarCurso, crearCurso } = require('../controllers/curso');
const {validadJWT} = require('../middlewares/validar-jwt');
const router = Router();

router.get('/', cargarCurso);
router.post('/',validadJWT ,crearCurso);

module.exports = router;