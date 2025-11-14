import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// O Component não é necessário aqui, a menos que você o use.
// import { Component } from '@angular/core'; 

// ⬇️ ETAPA 1: Importar os "vigias"
import { authGuard } from './services/auth.guard';
import { loginGuard } from './services/Login.guard';


export const routes: Routes = [
  // ⬇️ ETAPA 2: Adicionar canActivate ao login
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [loginGuard] // Só pode acessar se NÃO estiver logado
  },

  // ⬇️ ETAPA 3: Adicionar canActivate ao home
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [authGuard] // Só pode acessar se ESTIVER logado
  },

  // ⬇️ ETAPA 4: Adicionar canActivate ao dashboard
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [authGuard] // Só pode acessar se ESTIVER logado
  },

  // ⬇️ ETAPA 5: Mudar a rota padrão para '/home'.
  // O authGuard vai pegar o usuário aqui e, se ele não estiver logado,
  // vai redirecioná-lo para /login. É um fluxo melhor.
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // (Opcional, mas recomendado) Rota "coringa" para qualquer URL inválida
  { path: '**', redirectTo: '/home' } 
];