import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const toastrService = inject(ToastrService);
  const router = inject(Router);
  const token = localStorage.getItem('token');
  
   if (!token) {
      toastrService.warning('You are not authorized to access this page. Please log in.');
      router.navigate(['/login']);
      return false
  }

  return true 
};