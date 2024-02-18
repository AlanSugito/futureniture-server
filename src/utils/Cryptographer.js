import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {APIError, ServerError} from './Error.js';

class Cryptographer {
  static async hash(data) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(data, salt);
  }

  static async compare(data, encrypted) {
    return await bcrypt.compare(data, encrypted);
  }

  static generateToken(data, secret, ttl = '900s') {
    return jwt.sign(data, secret, {expiresIn: ttl});
  }

  static async verifyToken(token, secret) {
    try {
      const decoded = await jwt.verify(token, secret);
      return decoded;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError)
        throw new APIError(406, error.message);
      throw new ServerError();
    }
  }
}

export default Cryptographer;
