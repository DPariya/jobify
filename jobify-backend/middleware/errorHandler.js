// middleware/errorHandler.js
import { logError } from '../utils/logger.js';

const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Something went wrong';
  const code = err.code || 'UNKNOWN_ERROR'; // ✅ Add this line
  //Log the error

  logError(err);
  res.status(status).json({
    msg: message,
    code: code, // ✅ Send the custom code
  });
};

export default errorHandler;
