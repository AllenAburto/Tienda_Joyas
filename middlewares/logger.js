const fs = require('fs');
const path = require('path');

const logToFile = (req, res, next) => {
    const logFilepath = path.join(__dirname, '../logs', 'access.log');

    const logmessage = `[${new Date().toISOString()}] Ruta accedida: ${req.method} ${req.url}\n`;

    fs.appendFile(logFilepath, logmessage, (err) => {
        if (err) {
            console.error('Error al escribir en el log:', err);
        }
    });

    next();
};

module.exports = logToFile;