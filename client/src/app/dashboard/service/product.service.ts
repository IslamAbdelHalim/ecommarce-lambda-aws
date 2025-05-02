import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { UserProfile } from '../models/userProfile.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private api = `https://fakestoreapi.com/products`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api);
  }
}
