import { computed, Service, signal } from '@angular/core';

@Service()
export class CartService {
  items = signal<{ productId: number; quantity: number }[]>([]);
  itemsCount = computed(() => this.items().reduce((acc, item) => acc + item.quantity, 0));

  localStorageKey = 'cartItems';

  // constructor() {
  //   const storedItems = localStorage.getItem(this.localStorageKey);
  //   if (storedItems) {
  //     try {
  //       const parsedItems = JSON.parse(storedItems);
  //       if (Array.isArray(parsedItems)) {
  //         this.items.set(parsedItems);
  //       }
  //     } catch (error) {
  //       console.error('Error parsing cart items from localStorage:', error);
  //     }
  //   }
  // }

  addToCart(productId: number) {
    this.items.update((items) => {
      const existingItem = items.find((item) => item.productId === productId);
      if (existingItem) {
        return items.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
        );
      } else {
        localStorage.setItem(
          this.localStorageKey,
          JSON.stringify([...items, { productId, quantity: 1 }]),
        );
        return [...items, { productId, quantity: 1 }];
      }
    });
  }
}
