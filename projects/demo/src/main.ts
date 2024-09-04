import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component'; // bootstrapApplication(AppModule, appConfig).catch(err => console.error(err));

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));

// platformBrowserDynamic()
//     .bootstrapModule(AppModule)
//     .catch(err => console.error(err));
