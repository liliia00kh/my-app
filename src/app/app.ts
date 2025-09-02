import { Component } from '@angular/core';
import { ProductListComponent } from './features/product/product-list.component/product-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent],
  template: `<app-product-list />`
})
export class App {
}