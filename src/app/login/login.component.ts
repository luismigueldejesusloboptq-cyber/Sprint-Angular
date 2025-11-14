import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// 🔽 ETAPA 1: Remover HttpClient e importar o AuthService
// import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http'; // NÃO PRECISA MAIS
import { AuthService } from '../services/auth.Service'; // IMPORTAR O SERVIÇO
import { CommonModule } from '@angular/common'; // Necessário para o @if

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule // 🔽 ETAPA 2: Adicionar CommonModule para o @if
    // HttpClientModule // NÃO PRECISA MAIS
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username = '';
  password = '';

  isLoading = false;
  errorMessage: string | null = null;

  // private apiUrl = 'http://localhost:3001'; // NÃO PRECISA MAIS

  constructor(
    private router: Router,
    // private http: HttpClient // NÃO PRECISA MAIS
    private authService: AuthService // 🔽 ETAPA 3: Injetar o AuthService
  ) { }

  fazerLogin() {

    this.isLoading = true;
    this.errorMessage = null;

    // 🔽 ETAPA 4: Criar o objeto de credenciais
    const credentials = {
      nome: this.username,
      senha: this.password
    };

    console.log("LoginComponent (linha 46): 🚀 Tentando login com:", credentials);

    // 🔽 ETAPA 5: Chamar o AuthService em vez do http.post
    this.authService.login(credentials).subscribe({
      
      next: (response) => {
        this.isLoading = false;
        console.log("LoginComponent (linha 52): ✅ Login bem-sucedido!", response);
        console.log("LoginComponent (linha 53): 🚀 Navegando para /home...");
        
        // A mágica acontece aqui:
        // O AuthService já salvou o login e já notificou os Guards.
        // Agora a navegação será PERMITIDA.
        this.router.navigate(['/home']);
      },

      error: (err: any) => {
        this.isLoading = false;
        
        // A lógica de erro vem do AuthService
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = "Falha na comunicação com o servidor. Tente novamente mais tarde.";
        }
        console.error("LoginComponent (linha 70): ❌ Erro no login:", err);
      }
    });
  }

}