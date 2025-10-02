import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { Product } from './product.model';
import { AppConfigService, AppConfig } from '../../services/config.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(
    private http: HttpClient,
    private configService: AppConfigService
  ) {}

  getProducts(): Observable<Product[]> {
    return this.configService.config$.pipe(
      filter((cfg): cfg is AppConfig => cfg !== null),
      take(1),
      switchMap(cfg => {
        return this.http.get<Product[]>(`${cfg.apiUrl}/product`); })
    );
  }
}
