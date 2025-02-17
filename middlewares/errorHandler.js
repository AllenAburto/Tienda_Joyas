const errorHandler = (err, req, res, next) => {
    console.error('Error Detectado', err);
    
    res.status(500).json({ error: 'Se ha Detectado un Error en el Servidor' });
};

module.exports = errorHandler;