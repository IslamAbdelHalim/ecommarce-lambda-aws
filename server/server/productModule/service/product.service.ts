import IProductDao from '../daos/implementProductDao';

export default class productService {
  private productDao;

  constructor() {
    this.productDao = new IProductDao();
  }
}
