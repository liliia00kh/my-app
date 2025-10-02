import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { AppConfigService } from './app/services/config.service';

async function main() {
  try {
    const response = await fetch('/config.json');
    const config = await response.json();

    const appConfigService = new AppConfigService();
    appConfigService.setConfig(config);

    // Стартуємо Angular
    bootstrapApplication(App, {
      ...appConfig,
      providers: [
        ...(appConfig.providers || []),
        { provide: AppConfigService, useValue: appConfigService }
      ]
    }).catch(err => console.error(err));
  } catch (err) {
    console.error('Помилка при завантаженні конфігу', err);
  }
}

main();
