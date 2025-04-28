import pool from '../../config/db';
import { Product } from '../models/product.models';
import ProductDao from './product.dao';

export default class IProductDao implements ProductDao {
  async createProduct(product: Omit<Product, 'product_id'>): Promise<void> {
    await pool.query(`INSERT INTO products (name, description, price, image_url) VALUES (?, ?, ?, ?)`, [
      product.name,
      product.description,
      product.price,
      product.imageUrl,
    ]);
  }
  async getProducts(): Promise<Product[]> {
    const [rows] = await pool.query(`SELECT product_id, name, description, price, image_url FROM products`);

    return rows as Product[];
  }
  async getProductById(id: string | number): Promise<Product> {
    const [rows] = await pool.query(
      `SELECT product_id, name, description, price, image_url FROM products WHERE product_id=?`,
      [id],
    );

    return (rows as Product[])[0];
  }
  updateProduct(id: string | number, Product: Partial<Product>): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  async deleteProductById(id: string | number): Promise<void> {
    await pool.query(`DELETE FROM products WHERE product_id=?`, [id]);
  }
}
