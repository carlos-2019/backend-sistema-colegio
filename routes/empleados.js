const { Router } = require('express');
const { cargarEmpleados, cargarEmpleadoPorId, crearEmpleados, actualizarEmpleados, eliminarEmpleados } = require('../controllers/empleados');
const router = Router();

router.get('/', cargarEmpleados);
router.get('/:id', cargarEmpleadoPorId);
router.post('/', crearEmpleados);
router.put('/:id', actualizarEmpleados);
router.put('/eliminar/:id', eliminarEmpleados);

module.exports = router;