import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      // ⬇️ Active le scroll vers les fragments (#id) + restauration de position
      withInMemoryScrolling({
        anchorScrolling: 'enabled',          // scroll vers #about, #skills, etc.
        scrollPositionRestoration: 'enabled' // back/forward => restaure la position
      }),
    ),
    provideClientHydration(withEventReplay()),
  ]
};
