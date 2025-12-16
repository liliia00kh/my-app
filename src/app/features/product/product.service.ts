import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, take, takeUntil } from 'rxjs/operators';
import { Product } from './product.model';
import { AppConfigService, AppConfig } from '../../services/config.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private cancelTask$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    private configService: AppConfigService
  ) {}

  getProducts(): Observable<Product[]> {
    return this.configService.config$.pipe(
      filter((cfg): cfg is AppConfig => cfg !== null),
      take(1),
      switchMap(cfg =>
        this.http
          .get<Product[]>(`${cfg.apiUrl}/product/cancelable-task`)
          .pipe(takeUntil(this.cancelTask$))
      )
    );
  }

  cancelCancelableTask(): void {
    this.cancelTask$.next();
  }
}
