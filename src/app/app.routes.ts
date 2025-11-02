import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Services } from './pages/services/services';
import { Contact } from './pages/contact/contact';
import { Experience } from './pages/experience/experience';
import { Skills } from './pages/skills/skills';
import { Projects } from './pages/projects/projects';
import { ReviewsComponent } from './pages/reviews/reviews';
import { LoginComponent } from './pages/login/login';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail';
import { BlogEditorComponent } from './blog/blog-editor/blog-editor';
import { BlogListComponent } from './blog/blog-list/blog-list';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'about', component: About },
  { path: 'experience', component: Experience },
  { path: 'services', component: Services },
  { path: 'skills', component: Skills },
  { path: 'contact', component: Contact },
  { path: 'projects', component: Projects },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'blogs', component: BlogListComponent },
  { path: 'blogs/new', component: BlogEditorComponent },
  { path: 'blogs/edit/:id', component: BlogEditorComponent },
  { path: 'blogs/:id', component: BlogDetailComponent },
  { path: '**', redirectTo: 'home' } // optional: catch-all for bad routes
];

