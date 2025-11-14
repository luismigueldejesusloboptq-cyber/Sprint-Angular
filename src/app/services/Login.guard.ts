import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
// CORREÇÃO: Importando da mesma pasta
import { AuthService } from './auth.Service'; 

export const loginGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

  // Lógica INVERSA
  if (authService.isAuthenticated()) {
    // Se o usuário JÁ ESTÁ logado, redireciona para o dashboard/home.
    console.warn('Acesso negado! (login.guard) - Usuário já está logado.');
    router.navigate(['/home']); // Ou '/dashboard'
    return false; // Bloqueia o acesso ao /login
  }

  // Se NÃO ESTÁ logado, ele PODE acessar o /login.
  return true; 
};