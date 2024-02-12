import {describe, expect, it} from '@jest/globals';
import {credentialSchema, validate} from '../../src/validations';
import {ValidationError} from '../../src/utils';

describe('Credential data schema validation', () => {
  it('should return the validated data', () => {
    const data = {email: 'test@mail.com', password: 'qjdnqwjndqndqkd'};
    const result = validate(data, credentialSchema);

    expect(result).toEqual(data);
  });

  it('should throw validation error', () => {
    const data = {email: 'testmail.com', password: 'qjdnqwjndqndqkd'};

    expect(() => validate(data, credentialSchema)).toThrow(ValidationError);
    expect(() => validate(data, credentialSchema)).toThrow(
      'Email is not a valid email format!'
    );
  });
});
