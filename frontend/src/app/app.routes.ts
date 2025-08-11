import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { About } from './features/about/about';
import { Skills } from './features/skills/skills';
import { Projects } from './features/projects/projects';
import { Contact } from './features/contact/contact';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'a-propos', component: About },
  { path: 'competences', component: Skills },
  { path: 'projets', component: Projects },
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '' }
];
