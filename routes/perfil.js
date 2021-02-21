const { Router } = require('express');
const { detalle } = require('../controllers/perfil');

const router = Router();

router.get('/:id', detalle);

module.exports = router;