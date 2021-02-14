const {Router} = require('express');
const {check} = require('express-validator');
const { login, newToken } = require('../controllers/auth');
const {validarCampos} = require('../middlewares/validar-campos');
const {validadJWT} = require('../middlewares/validar-jwt');

const router = Router();

router.post('/',login)

router.get('/newToken', validadJWT, newToken)

module.exports = router;