import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { About } from './features/about/about';
import { Skills } from './features/skills/skills';
import { Projects } from './features/projects/projects';
import { Contact } from './features/contact/contact';
import { Landing } from './features/landing/landing';

export const routes: Routes = [
  { path: '', component: Landing }, // ⬅️ la page qui empile tout

  { path: 'home', component: Home },
  { path: 'a-propos', component: About },
  { path: 'competences', component: Skills },
  { path: 'projets', component: Projects },
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '' }
];
