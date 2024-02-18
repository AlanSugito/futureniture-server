class APIError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }

  static parseError(error) {
    if (!(error instanceof APIError)) throw new ServerError(error.message);

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
  constructor(message = 'Internal Server Error') {
    super(500, message);
  }
}

export {APIError, NotFoundError, ServerError, ValidationError};
