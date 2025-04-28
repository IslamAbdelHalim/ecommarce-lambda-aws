import { Product } from '../models/product.models';

export default interface ProductDao {
  createProduct(product: Omit<Product, 'product_id'>): Promise<void>;
  getProducts(): Promise<Product[]>;
  getProductById(id: string | number): Promise<Product>;
  updateProduct(id: string | number, Product: Partial<Product>): Promise<Product>;
  deleteProductById(id: string | number): Promise<void>;
}
