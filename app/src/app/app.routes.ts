import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { BooksGalleryComponent } from './components/books-gallery/books-gallery.component';
import { authGuard } from './guards/auth.guard';
import { ComponentNotFoundComponent } from './components/component-not-found/component-not-found.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';

export const routes = [
    { 
      path: 'register',
      loadComponent: () => import('./components/registration/registration.component').then(l => l.RegistrationComponent)
    },
    { 
      path: 'login',
      loadComponent: () => import('./components/login/login.component') .then(l => l.LoginComponent) },
      {
         path: 'subscription', component: SubscriptionComponent, canActivate: [authGuard] },
    { 
      path: 'password-reset',
      component: PasswordResetComponent 
    },
    { 
      path: '',
      component: BooksGalleryComponent },
    { 
      path: '**', 
      component: ComponentNotFoundComponent 
    }
];
