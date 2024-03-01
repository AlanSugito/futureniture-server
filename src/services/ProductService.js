import {ProductRepository} from '../repositories/index.js';
import {APIError} from '../utils/Error.js';

class ProductService {
  constructor() {
    this.repository = new ProductRepository();
  }

  async getManyProducts(category = null) {
    try {
      const products = await this.repository.getMany({
        category,
      });

      return products;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }
}

export default ProductService;
