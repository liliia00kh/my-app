import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products = signal<Product[] | null>(null);
  isTaskRunning = signal(false);
  hasStarted = signal(false);
  lastTaskMessage = signal<string | null>(null);

  private productsSub?: Subscription;

  constructor(private productService: ProductService) {}

  startTask(): void {
    if (this.isTaskRunning()) {
      return;
    }

    // Cancel any previous in-flight request
    this.productService.cancelCancelableTask();
    this.productsSub?.unsubscribe();

    this.hasStarted.set(true);
    this.isTaskRunning.set(true);
    this.lastTaskMessage.set(null);
    this.products.set(null);

    this.productsSub = this.productService
      .getProducts()
      .pipe(
        finalize(() => {
          this.isTaskRunning.set(false);
        })
      )
      .subscribe({
        next: (products) => {
          this.products.set(products);

          if (!products.length) {
            this.lastTaskMessage.set('Продукти не знайдено.');
          } else {
            this.lastTaskMessage.set(null);
          }
        },
        error: (err) => {
          console.error(err);
          this.lastTaskMessage.set('Сталася помилка під час запиту.');
          this.isTaskRunning.set(false);
        },
      });
  }

  cancelTask(): void {
    if (!this.isTaskRunning()) {
      return;
    }

    this.productService.cancelCancelableTask();
    this.productsSub?.unsubscribe();
    this.isTaskRunning.set(false);
    this.lastTaskMessage.set('Запит скасовано.');
  }
}
