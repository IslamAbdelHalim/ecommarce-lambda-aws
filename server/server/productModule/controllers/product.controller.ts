import productService from '../service/product.service';

export default class ProductController {
  private productService;

  constructor() {
    this.productService = new productService();
  }
}
