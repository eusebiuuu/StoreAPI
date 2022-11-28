const errorHandlerMiddleware = async (err, req, res, next) => {
  return res.status(err.status).json({ msg: err.stack });
}

module.exports = errorHandlerMiddleware;
