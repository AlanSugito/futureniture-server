import {UserRepository} from '../repositories/index.js';
import {APIError} from '../utils/index.js';
import {userProfileSchema, validate} from '../validations/index.js';

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async getUserProfile(id) {
    try {
      const user = await this.repository.getById(id);

      return user;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  async verifyUser(id) {
    try {
      await this.repository.updateProfile(id, {verified: true});
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  async updateUserPassword(email, newPassword) {
    try {
      await this.repository.updatePassword(email, newPassword);

      return true;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  async updateUserProfile(id, data) {
    try {
      const validatedData = validate(data, userProfileSchema);
      await this.repository.updateProfile(id, validatedData);
    } catch (error) {
      throw APIError.parseError(error);
    }
  }
}

export default UserService;
