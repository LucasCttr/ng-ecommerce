import { Component, inject, input, TemplateRef } from '@angular/core';
import { Card } from '../card/card';
import { Product } from '../../../interfaces/product.interface';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-list',
  imports: [Card],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  // Recibe la lista de cualquier cosa (T)
  private productService = inject(ProductService);

  products = this.productService.products; // lee el signal

  ngOnInit() {
    this.productService.getProducts(); // dispara la carga
  }
}
