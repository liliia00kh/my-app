import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
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
  products$?: Observable<Product[]>;
  isTaskRunning = false;
  hasStarted = false;
  lastTaskMessage: string | null = null;

  constructor(private productService: ProductService) {}

  startTask(): void {
    if (this.isTaskRunning) {
      return;
    }

    // Cancel any previous in-flight request
    this.productService.cancelCancelableTask();

    this.hasStarted = true;
    this.isTaskRunning = true;
    this.lastTaskMessage = null;

    this.products$ = this.productService.getProducts().pipe(
      tap((products) => {
        if (!products.length) {
          this.lastTaskMessage = 'Продукти не знайдено.';
        } else {
          this.lastTaskMessage = null;
        }
      }),
      catchError((err) => {
        console.error(err);
        this.lastTaskMessage = 'Сталася помилка під час запиту.';
        this.isTaskRunning = false;
        // Return empty list so template can still render gracefully
        return of([]);
      }),
      finalize(() => {
        this.isTaskRunning = false;
      })
    );
  }

  cancelTask(): void {
    if (!this.isTaskRunning) {
      return;
    }

    this.productService.cancelCancelableTask();
    this.isTaskRunning = false;
    this.lastTaskMessage = 'Запит скасовано.';
  }
}
