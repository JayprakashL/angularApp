import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { APP_CONFIG, APP_SERVICE_CONF } from './app_config/appconfig.service';

// Mention the InjectionToken in app.config or the configuration file mentioned inside the parameter of the InjectionToken.
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    {
      provide: APP_SERVICE_CONF,
      useValue: APP_CONFIG
    }
  ]
};
