import {prismaClient} from '../apps/index.js';
import {APIError, Cryptographer, NotFoundError} from '../utils/index.js';

class UserRepository {
  async isUserExist(email) {
    try {
      const user = await prismaClient.user.findUnique({where: {email}});
      if (user) return true;

      return false;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  async save(data) {
    try {
      if (await this.isUserExist(data.email))
        throw new APIError(400, 'This email is alreday used!');

      let hashedPassword;

      if (data.password)
        hashedPassword = await Cryptographer.hash(data.password);

      const user = await prismaClient.user.create({
        data: {...data, password: hashedPassword},
      });

      return user.id;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  exclude(obj, fields) {
    return Object.fromEntries(
      Object.entries(obj).filter(([field]) => !fields.includes(field))
    );
  }

  async getById(id) {
    try {
      const user = await prismaClient.user.findUnique({where: {id}});

      if (!user) throw new NotFoundError('User not found!');

      return this.exclude(user, ['password', 'token', 'is_active']);
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  async getCredentials(email) {
    try {
      const user = await prismaClient.user.findUnique({
        where: {email},
        select: {password: true, token: true},
      });

      if (!user) throw new NotFoundError('User not found!');

      return user;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  async updatePassword(email, newPassword) {
    try {
      if (!this.isUserExist(email)) throw new NotFoundError('User not found');

      await prismaClient.user.update({
        where: {email},
        data: {password: newPassword, updated_at: new Date()},
      });
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  async updateProfile(email, data) {
    try {
      if (!this.isUserExist(email)) throw new NotFoundError('User not found');

      await prismaClient.user.update({
        where: {email},
        data: {...data, updated_at: new Date()},
      });
    } catch (error) {
      throw APIError.parseError(error);
    }
  }
}

export default UserRepository;
