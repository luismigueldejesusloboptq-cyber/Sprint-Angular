import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

// ETAPA 1: Corrigir o caminho/nome do arquivo (é 'auth.service' minúsculo)
import { AuthService } from '../services/auth.Service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  sidebarVisible: boolean = false;

  // ETAPA 2: Injetar o AuthService no construtor
  constructor(private authService: AuthService) {}

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  // ETAPA 3: Criar a função de logout
  fazerLogout(): void {
    console.log('HomeComponent: ➡️ Chamando logout...');
    this.authService.logout();
    // Você não precisa navegar, o authService.logout() já faz isso!
  }
}
