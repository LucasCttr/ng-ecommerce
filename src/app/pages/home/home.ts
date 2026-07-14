import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductList } from '../../shared/components/list/product-list';

@Component({
  selector: 'app-home',
  imports: [ProductList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  productService = inject(ProductService);

  ngOnInit() {}
}
