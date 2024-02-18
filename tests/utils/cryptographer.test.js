import {Cryptographer} from '../../src/utils';
import {describe, expect, it} from '@jest/globals';

describe('Cryptographer', () => {
  let hashed;
  it('should hash a string', async () => {
    const result = await Cryptographer.hash('something');
    hashed = result;
    console.log(hashed);
  });

  it('should compare a hashed string', async () => {
    const result = await Cryptographer.compare('something', hashed);
    expect(result).toBeTruthy();
  });

  let token;
  const SECRET = 'himitsu';
  it('should generate token', () => {
    token = Cryptographer.generateToken({token: 'token'}, SECRET, '10d');
    console.log(token);
  });

  it('should verify the token', async () => {
    const result = await Cryptographer.verifyToken(token, SECRET);
    expect(result).toHaveProperty('token', 'token');
  });

  it.failing('should throw error', async () => {
    await Cryptographer.verifyToken(token, 'wrong');
  });

  it.failing('Should throw jwt expired', async () => {
    token = Cryptographer.generateToken({token: 'something'}, SECRET, '-1s');

    await Cryptographer.verifyToken(token, SECRET);
  });
});
