const { Router } = require('express');
const { cargarArea, crearArea } = require('../controllers/area');
const {validadJWT} = require('../middlewares/validar-jwt');
const router = Router();

router.get('/', cargarArea);
router.post('/',validadJWT ,crearArea);

module.exports = router;