import { Component } from '@angular/core';
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
  products: Product[] | null = null;
  isTaskRunning = false;
  hasStarted = false;
  lastTaskMessage: string | null = null;

  private productsSub?: Subscription;

  constructor(private productService: ProductService) {}

  startTask(): void {
    if (this.isTaskRunning) {
      return;
    }

    // Cancel any previous in-flight request
    this.productService.cancelCancelableTask();
    this.productsSub?.unsubscribe();

    this.hasStarted = true;
    this.isTaskRunning = true;
    this.lastTaskMessage = null;
    this.products = null;

    this.productsSub = this.productService
      .getProducts()
      .pipe(
        finalize(() => {
          // safety: ensure we never stay stuck in loading state
          this.isTaskRunning = false;
        })
      )
      .subscribe({
        next: (products) => {
          // as soon as we have data, stop showing loader and disable Cancel
          this.isTaskRunning = false;
          this.products = products;

          if (!products.length) {
            this.lastTaskMessage = 'Продукти не знайдено.';
          } else {
            this.lastTaskMessage = null;
          }
        },
        error: (err) => {
          console.error(err);
          this.lastTaskMessage = 'Сталася помилка під час запиту.';
          this.isTaskRunning = false;
        },
      });
  }

  cancelTask(): void {
    if (!this.isTaskRunning) {
      return;
    }

    this.productService.cancelCancelableTask();
    this.productsSub?.unsubscribe();
    this.isTaskRunning = false;
    this.lastTaskMessage = 'Запит скасовано.';
  }
}
