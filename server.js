require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const joyasRoutes = require('./routes/joyas.routes');
const logTofile = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(logTofile);
app.use(errorHandler);

app.use('/joyas', joyasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Activo en http://localhost:${PORT}`);
});