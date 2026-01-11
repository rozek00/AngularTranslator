import { Routes } from '@angular/router';
import { Logingg } from './logingg/logingg';
import { Registration } from './registration/registration';
import { TranslatorComponent } from './translator/translator';
import { HazardDlaZnudzonych } from './hazard-dla-znudzonych/hazard-dla-znudzonych';
import { TranslationHistory } from './translation-history/translation-history';

export const routes: Routes = [
  { path: '', component: TranslatorComponent },
  { path: 'login', component: Logingg },
  { path: 'register', component: Registration },
  { path: 'history', redirectTo: 'history/1', pathMatch: 'full'  },
  { path: 'history/:sortOrder', component: TranslationHistory },
  {path: 'hazard', component: HazardDlaZnudzonych},
  { path: '**', redirectTo: '' }
];
