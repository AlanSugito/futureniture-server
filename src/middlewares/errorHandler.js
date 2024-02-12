import {APIError, Formatter, ServerError} from '../utils/index.js';
import {logger} from '../apps/index.js';

const errorHandler = (error, req, res, next) => {
  if (!error) return next();

  let errorState = new ServerError();
  if (error instanceof APIError) errorState = error;

  res.status(errorState.status).json({message: errorState.message});
  logger.error(Formatter.formatRequestLog(req, res, error.message));
  return;
};

export default errorHandler;
