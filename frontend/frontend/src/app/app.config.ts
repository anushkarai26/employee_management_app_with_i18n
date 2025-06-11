import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';


export const appConfig: ApplicationConfig = {
  providers: [
    ValidateService,
    AuthService,
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ]
};