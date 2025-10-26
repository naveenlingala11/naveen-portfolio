import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Services } from './pages/services/services';
import { Contact } from './pages/contact/contact';
import { Experience } from './pages/experience/experience';
import { Skills } from './pages/skills/skills';
import { Projects } from './pages/projects/projects';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'experience', component: Experience },
  { path: 'services', component: Services },
  { path: 'skills', component: Skills },
  { path: 'contact', component: Contact },
  { path: 'projects', component: Projects}
];
