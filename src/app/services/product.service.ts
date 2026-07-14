import { inject, Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, Product } from '../interfaces/product.interface';
import { environment } from '../../environments/environment.development';
import { debounceTime, Subject } from 'rxjs';

interface CacheItem {
  products: Product[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private url = environment.apiUrl;

  size = signal(18);
  page = signal(1);

  selectedCategory = signal<Category | null>(null);
  priceMax = signal<number | null>(null);
  priceMin = signal<number | null>(null);
  searchInput = signal<string>('');

  categories = Object.values(Category);

  private cache = new Map<string, CacheItem>();

  // Datos crudos de la API, sin filtrar por precio todavía
  private rawProducts = signal<Product[]>([]);
  total = signal(0);
  loading = signal(false);

  // Precio se filtra acá, client-side, porque la API no lo soporta
  products = computed(() => {
    let list = this.rawProducts();
    const min = this.priceMin();
    const max = this.priceMax();
    if (min !== null) list = list.filter(p => p.price >= min);
    if (max !== null) list = list.filter(p => p.price <= max);
    return list;
  });

  private searchTrigger = new Subject<string>();

  constructor() {
    this.searchTrigger.pipe(debounceTime(400)).subscribe(() => {
      this.page.set(1);
      this.getProducts();
    });
  }

  onSearchInput(value: string) {
    this.searchInput.set(value);
    this.searchTrigger.next(value);
  }

  getProducts() {
    const search = this.searchInput().trim();
    const category = this.selectedCategory();
    const key = `${search}-${category ?? 'all'}-${this.page()}-${this.size()}`;

    if (this.cache.has(key)) {
      const cachedData = this.cache.get(key)!;
      this.rawProducts.set(cachedData.products);
      this.total.set(cachedData.total);
      return;
    }

    this.loading.set(true);
    const limit = this.size();
    const skip = (this.page() - 1) * this.size();

    let endpoint: string;
    if (search) {
      endpoint = `${this.url}/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
    } else if (category) {
      endpoint = `${this.url}/category/${category}?limit=${limit}&skip=${skip}`;
    } else {
      endpoint = `${this.url}?limit=${limit}&skip=${skip}`;
    }

    this.http.get<{ products: Product[]; total: number }>(endpoint).subscribe({
      next: (data) => {
        this.cache.set(key, data);
        this.rawProducts.set(data.products);
        this.total.set(data.total);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al traer productos:', err);
        this.loading.set(false);
      },
    });
  }

  setCategory(category: Category | null) {
    this.selectedCategory.set(category);
    this.page.set(1);
    this.getProducts();
  }

  setPriceRange(min: number | null, max: number | null) {
    this.priceMin.set(min);
    this.priceMax.set(max);
    // No hace falta getProducts(): el precio filtra sobre rawProducts, no pide nada nuevo a la API
  }

  clearFilters() {
    this.selectedCategory.set(null);
    this.priceMin.set(null);
    this.priceMax.set(null);
    this.searchInput.set('');
    this.page.set(1);
    this.getProducts();
  }
}