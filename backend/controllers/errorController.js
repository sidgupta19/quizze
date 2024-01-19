module.exports = (err, req, res, next) => {
  console.error(err);
  err.statusCode = err.statusCode || 500;
  err.status = `${err.statusCode}`.startsWith('4') ? 'fail' : 'errror';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};
