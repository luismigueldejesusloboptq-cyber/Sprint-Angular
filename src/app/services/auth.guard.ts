import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
// CORREÇÃO: Importando da mesma pasta
import { AuthService } from './auth.Service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

  // Usamos o método síncrono do serviço
  if (authService.isAuthenticated()) {
    return true; // Usuário logado, pode acessar
  }

  // Usuário não logado, redireciona para /login
  console.warn('Acesso negado! (auth.guard) - Usuário não autenticado.');
  router.navigate(['/login']);
  return false; 
};