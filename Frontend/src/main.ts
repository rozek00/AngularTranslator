import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { ReactiveFormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { Logingg } from './app/logingg/logingg';
import { Registration } from './app/registration/registration';


const routes: Routes = [
  { path: '', component: App },
  { path: 'login', component: Logingg },
  { path: 'register', component: Registration }
];

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),
    provideHttpClient(),
    importProvidersFrom(ReactiveFormsModule),
    provideRouter(routes)
  ]
}).catch((err) => console.error(err));
