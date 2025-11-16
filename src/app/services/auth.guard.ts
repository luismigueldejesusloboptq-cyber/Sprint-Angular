import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.Service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

  
  if (authService.isAuthenticated()) {
    return true; 
  }

  
  console.warn('Acesso negado! (auth.guard) - Usuário não autenticado.');
  router.navigate(['/login']);
  return false; 
};