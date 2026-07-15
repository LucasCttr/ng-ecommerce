import { Component, inject, signal } from '@angular/core';
import { sign } from 'crypto';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  cartService = inject(CartService);
  cartCount= signal(0);
}
