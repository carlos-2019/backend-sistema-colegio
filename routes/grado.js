const { Router } = require('express');
const { cargarGrado, crearGrado } = require('../controllers/grado');
const {validadJWT} = require('../middlewares/validar-jwt');
const router = Router();

router.get('/', cargarGrado);
router.post('/',validadJWT ,crearGrado);

module.exports = router;