import {describe, expect} from '@jest/globals';
import {profileSchema, validate} from '../../src/validations';
import {ValidationError} from '../../src/utils';

describe('Profile Schema', () => {
  it('Should return the validated data', () => {
    const data = {fullname: 'Test', phone: '09128901', address: 'kqndkdWDE'};
    const result = validate(data, profileSchema);

    expect(result).toEqual(data);
  });

  it('should throw Validation error', () => {
    const data = {fullname: '', phone: 'qwdqdq', address: 'qwdqwdq'};
    expect(() => validate(data, profileSchema)).toThrow(ValidationError);
    expect(() => validate(data, profileSchema)).toThrow(
      'Full name is a required field!'
    );
  });
});
