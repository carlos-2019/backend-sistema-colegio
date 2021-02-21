require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');
// Crear el servidor de express
const app = express();

// CONFIGURAR CORS
app.use(cors());

// LECTURA Y PARSEO DEL BODY
app.use(express.json());

// BASE DE DATOS
dbConnection();

// RUTAS
app.use('/api/alumno', require('./routes/alumno'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/profesor', require('./routes/profesor'));
app.use('/api/empleados', require('./routes/empleados'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/semestre', require('./routes/semestre'));
app.use('/api/curso', require('./routes/curso'));
app.use('/api/grado', require('./routes/grado'));
app.use('/api/area', require('./routes/area'));
app.use('/api/matricula', require('./routes/matricula'));
app.use('/api/perfil', require('./routes/perfil'));

app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en el puesto: ' + process.env.PORT);
});