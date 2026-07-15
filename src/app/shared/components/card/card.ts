import { Component, inject, input } from '@angular/core';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  cartService = inject(CartService);

  id = input<number>(0);
  title = input<string>('Card Title');
  text = input<string>('Card Text');
  price = input<number>(0);
  images = input<string[]>([]);
}
