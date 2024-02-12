import {describe, expect, it} from '@jest/globals';
import {APIError, NotFoundError, ServerError} from '../../src/utils';

describe('API Error utility class', () => {
  it('should have status property', () => {
    const error = new APIError(400, 'Bad Request');

    expect(error).toHaveProperty('status', 400);
  });

  it('should parse an error', () => {
    expect(() => APIError.parseError(new APIError(404, 'not found'))).toThrow(
      NotFoundError
    );
    expect(() => APIError.parseError(new Error('message'))).toThrow(
      ServerError
    );
    expect(() => APIError.parseError(new APIError(400, 'Bad Request'))).toThrow(
      APIError
    );
  });
});
