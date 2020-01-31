// eslint-disable-next-line no-unused-vars
exports.errorMiddleware = (err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 500

  const { statusCode, message } = err

  return res.status(statusCode).json({
    error: 'error',
    statusCode,
    message,
  })
}
