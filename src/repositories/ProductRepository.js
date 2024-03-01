import {prismaClient} from '../apps/index.js';
import {APIError, NotFoundError} from '../utils/Error.js';

class ProductRepository {
  async getMany(where = {}) {
    try {
      const products = await prismaClient.product.findMany({
        where: {...where, is_active: true},
        select: {
          name: true,
          short_desc: true,
          id: true,
          price: true,
          img_url: true,
          quality: true,
        },
      });

      return products;
    } catch (error) {
      throw APIError.parse(error);
    }
  }

  async getById(id) {
    try {
      const product = await prismaClient.product.findUnique({
        where: {id, is_active: true},
        include: {Color: true},
      });

      if (!product) throw new NotFoundError('Product not found');

      return product;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }
}

export default ProductRepository;
