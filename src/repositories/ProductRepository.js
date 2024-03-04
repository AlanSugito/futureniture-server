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
          category: true,
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
        include: {colors: true, category: true},
      });

      if (!product) throw new NotFoundError('Product not found');

      return product;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  async searchProducts(search) {
    try {
      const products = await prismaClient.product.findMany({
        where: {
          OR: [
            {name: {contains: search}},
            {category: {name: {contains: search}}},
            {short_desc: {contains: search}},
          ],
        },
      });

      return products;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  async save(data) {
    try {
      const result = await prismaClient.product.create({
        data,
        select: {id: true},
      });

      return result;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  async update(id, data) {
    try {
      const result = await prismaClient.product.update({
        where: {id},
        data,
      });

      return result;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  async removeProduct(id) {
    try {
      const result = await prismaClient.product.update({
        where: {id},
        data: {is_active: false},
        select: {id: true},
      });

      return result;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  async updateStock(id, amount) {
    try {
      const result = await prismaClient.product.update({
        where: {id},
        data: {stock: amount},
      });

      return result;
    } catch (error) {
      throw APIError.parse(error);
    }
  }

  async decreaseStock(id) {
    try {
      await prismaClient.product.update({
        where: {id},
        data: {stock: {decrement: 1}},
      });
    } catch (error) {
      throw APIError.parseError(error);
    }
  }
}

export default ProductRepository;
