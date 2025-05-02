import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DataView } from 'primeng/dataview';
import { SelectButton } from 'primeng/selectbutton';
import { Product } from '../../models/product.model';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: true,
  imports: [DataView, ButtonModule, CommonModule, SelectButton, FormsModule],
  providers: [ProductService],
})
export class ProductsComponent {
  layout: 'grid' | 'list' = 'grid';

  products = signal<Product[]>([]);

  options = ['list', 'grid'];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      console.log(products);
      this.products.set([...products]);
    });
  }
}
