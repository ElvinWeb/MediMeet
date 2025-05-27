import logger from "../utils/logger.js";

const errorHandler = (err, req, res) => {
  logger.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
