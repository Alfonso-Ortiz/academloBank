const globalErrorHandler = (err, req, res, next) => {
  //obtenemos el código de estado y lo igualamos al mismo y si no viene ningún 400 define 500
  err.statusCode = err.statusCode || 500;

  // iguamente obtenemos el status y lo igualamos al mismo y si no viene error define fail
  err.status = err.status || 'fail';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = globalErrorHandler;
