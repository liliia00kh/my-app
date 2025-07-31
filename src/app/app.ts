import { Component, OnInit } from '@angular/core';
import { MyApiService } from './my-api.service';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './features/product/product-list.component/product-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent],
  template: `<app-product-list />`
})
export class App {
}