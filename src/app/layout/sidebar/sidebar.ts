import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  productService = inject(ProductService);

  minInput = '';
  maxInput = '';

  constructor() {
    effect(() => {
      // Se re-ejecuta automáticamente cuando priceMin/priceMax cambian a null (o sea, al limpiar)
      if (this.productService.priceMin() === null && this.productService.priceMax() === null) {
        this.minInput = '';
        this.maxInput = '';
      }
    });
  }

  selectCategory(category: Category | null) {
    this.productService.setCategory(category);
  }

  applyPriceFilter() {
    const min = this.minInput ? Number(this.minInput) : null;
    const max = this.maxInput ? Number(this.maxInput) : null;
    this.productService.setPriceRange(min, max);
  }

  clearAll() {
    this.productService.clearFilters();
  }
}
