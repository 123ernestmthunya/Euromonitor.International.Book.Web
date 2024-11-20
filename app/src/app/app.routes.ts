import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

export const routes = [
    { path: 'register', component: RegistrationComponent },
    { path: 'login', component: LoginComponent }
  ];
