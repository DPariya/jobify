// middleware/errorHandler.js
import CustomError from '../utils/customErrors';
import { logError } from '../utils/logger';

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'something went wrong!';

  //Log the error

  logError(err);

  res.status(statusCode).json({ msg: message });
};

export default errorHandler;
