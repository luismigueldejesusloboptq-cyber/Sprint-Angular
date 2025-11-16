import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.Service'; 

export const loginGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);


  if (authService.isAuthenticated()) {
    
    console.warn('Acesso negado! (login.guard) - Usuário já está logado.');
    router.navigate(['/home']); 
    return false; 
  }

  
  return true; 
};