import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductListComponent } from './features/product/product-list.component/product-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent],
  template: `
  <button (click)="start()">Запустити запит</button>
  <button (click)="cancel()">Скасувати</button>
  <app-product-list />`
})
export class App {
  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  start() {
    this.http.get('http://localhost:5255/api/Product/cancelable-task')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => console.log('Результат:', data),
        error: err => console.error(err)
      });
  }

  cancel() {
    this.destroy$.next(); // скасовує підписку → запит HTTP може зупинитися
  }
}