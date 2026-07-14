import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  title = input<string>('Card Title');
  text = input<string>('Card Text');
  price = input<number>(0);
  images = input<string[]>([]);
}
