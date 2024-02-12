import {logger} from '../apps/index.js';

class APIError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    logger.error(`${this.status} ${this.message}`);
  }

  static parseError(error) {
    if (!(error instanceof APIError)) throw new ServerError();

    if (error.status === 400) throw new ValidationError(error.message);

    if (error.status === 404) throw new NotFoundError(error.message);

    throw new APIError(error.status, error.message);
  }
}

class ValidationError extends APIError {
  constructor(message) {
    super(400, message);
  }
}

class NotFoundError extends APIError {
  constructor(message) {
    super(404, message);
  }
}

class ServerError extends APIError {
  constructor() {
    super(500, 'Internal Server Error');
  }
}

export {APIError, NotFoundError, ServerError, ValidationError};
