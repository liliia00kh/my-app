import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MyApiService {
  private apiUrl = 'http://localhost:5255/api';

  constructor(private http: HttpClient) {}

  getHello() {
    return this.http.get(`${this.apiUrl}/products`, { responseType: 'text' });
  }
}