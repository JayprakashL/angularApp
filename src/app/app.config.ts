import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { APP_CONFIG, APP_SERVICE_CONF } from './app_config/appconfig.service';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { requestInterceptor } from './request.interceptor';
import { InitializerService } from './initializer.service';

// Mention the InjectionToken in app.config or the configuration file mentioned inside the parameter of the InjectionToken.
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // Routing configured (standalone) instead of app.routing.module.ts and imported RouterModule in app.module.ts
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([requestInterceptor] as any) // Add the interceptor in HttpClient Cast to 'any' avoiding type issues
    ),
    provideAppInitializer(() => {
      const initializer = inject(InitializerService);
      return initializer.initializer();
    }), // The status of loading config file as well as all the API calls initially when loading the application is present in localhost response with format as "statusCode", "status", "url" and "returnType".
    {
      provide: APP_SERVICE_CONF,
      useValue: APP_CONFIG,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useValue: requestInterceptor,
      multi: true,
    },
  ],
};
