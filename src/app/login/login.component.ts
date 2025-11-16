import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';



import { AuthService } from '../services/auth.Service'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule 
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username = '';
  password = '';

  isLoading = false;
  errorMessage: string | null = null;

 

  constructor(
    private router: Router,
    
    private authService: AuthService 
  ) { }

  fazerLogin() {

    this.isLoading = true;
    this.errorMessage = null;

    
    const credentials = {
      nome: this.username,
      senha: this.password
    };

    console.log("LoginComponent (linha 46): 🚀 Tentando login com:", credentials);

  
    this.authService.login(credentials).subscribe({
      
      next: (response) => {
        this.isLoading = false;
        console.log("LoginComponent (linha 52): ✅ Login bem-sucedido!", response);
        console.log("LoginComponent (linha 53): 🚀 Navegando para /home...");
        
    
        this.router.navigate(['/home']);
      },

      error: (err: any) => {
        this.isLoading = false;
        

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