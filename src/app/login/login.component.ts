import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule // 3. Adicione HttpClientModule aos imports
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  username = '';
  password = '';


  isLoading = false;
  errorMessage: string | null = null;


  private apiUrl = 'http://localhost:3001';


  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  fazerLogin() {

    this.isLoading = true;
    this.errorMessage = null;
    console.log("Tentando login com:", this.username);


    const body = {
      nome: this.username,
      senha: this.password
    };

    this.http.post(`${this.apiUrl}/login`, body).subscribe({

      next: (response) => {
        this.isLoading = false;
        console.log("Login bem-sucedido!", response);



        this.router.navigate(['/home']);
      },

      error: (err: HttpErrorResponse) => {
        this.isLoading = false;

        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {

          this.errorMessage = "Falha na comunicação com o servidor. Tente novamente mais tarde.";
        }
        console.error("Erro no login:", err);
      }
    });
  }

}
