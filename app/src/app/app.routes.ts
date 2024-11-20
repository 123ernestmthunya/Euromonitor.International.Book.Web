import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { BooksGalleryComponent } from './components/books-gallery/books-gallery.component';

export const routes = [
    { path: 'register', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'subscription', component: SubscriptionComponent },
    { path: '', component: BooksGalleryComponent }, 
  ];
