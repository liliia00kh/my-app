import { Routes } from '@angular/router';
import { ProductListComponent } from './features/product/product-list.component/product-list.component';
import { ContactComponent } from './features/contact/contact.component';

export const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products',
  },
  {
    path: '**',
    redirectTo: 'products',
  },
];
