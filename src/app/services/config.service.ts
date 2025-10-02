import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AppConfig {
  apiUrl: string;
}

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private _config$ = new BehaviorSubject<AppConfig | null>(null);

  readonly config$ = this._config$.asObservable();

  setConfig(config: AppConfig) {
    this._config$.next(config);
  }

  get apiUrl(): string {
    const cfg = this._config$.value;
    if (!cfg) {
      throw new Error('AppConfigService: The configuration has not been loaded yet!');
    }
    return cfg.apiUrl;
  }
}
