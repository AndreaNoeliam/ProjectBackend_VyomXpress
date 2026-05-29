const errorHandler = (err, req, res, next) => {
    console.error('❌ Server Error:', err.message || err);
    
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        error: err.message || 'Internal Server Error'
    });
};

module.exports = errorHandler;