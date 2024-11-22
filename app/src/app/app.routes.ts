import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { BooksGalleryComponent } from './components/books-gallery/books-gallery.component';
import { authGuard } from './guards/auth.guard';

export const routes = [
    { 
       path: 'register',
       loadComponent: () => import('./components/registration/registration.component').then(l => l.RegistrationComponent)
    },
    { 
      path: 'login',
      loadComponent: () => import('./components/login/login.component') .then(l => l.LoginComponent) },
    { 
      path: 'subscription', 
      loadComponent: () => import('./components/subscription/subscription.component').then(m => m.SubscriptionComponent), 
      canActivate: [authGuard] 
    },
    { 
      path: '', component: BooksGalleryComponent,
    }, 
];
