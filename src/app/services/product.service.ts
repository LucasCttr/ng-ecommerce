import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product.interface';
import { environment } from '../../environments/environment.development';
import { sign } from 'crypto';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private url = environment.apiUrl;
  size = signal(12);
  page = signal(1);


  products = signal<Product[]>([]);
  total = signal(0);

  getProducts() {
    this.http.get<{ products: Product[]; total: number }>(this.url)
      .subscribe({
        next: (data) => {
          this.products.set(data.products);
          this.total.set(data.total);
        },
        error: (err) => console.error('Error al traer productos:', err)
      });
  }
}