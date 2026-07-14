import { Component, computed, inject, input, TemplateRef } from '@angular/core';
import { Card } from '../card/card';
import { Product } from '../../../interfaces/product.interface';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true, // Asegúrate de tener esto
  imports: [Card],  // Si usas clases de Bootstrap, no necesitas importar nada especial, 
                    // pero asegúrate de que el CSS de Bootstrap esté cargado globalmente.
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  public productService = inject(ProductService);

  // Usar computed es más seguro para asegurar la reactividad
  products = computed(() => this.productService.products());
  totalPages = computed(() => Math.ceil(this.productService.total() / this.productService.size()));

  ngOnInit() {
    this.productService.getProducts();
  }

  changePage(newPage: number) {
    console.log('Changing to pagsse:', newPage);
    this.productService.page.set(newPage);
    this.productService.getProducts(); 
  }
}