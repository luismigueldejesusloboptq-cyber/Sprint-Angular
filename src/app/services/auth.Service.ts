import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';


//
// ⬇️⬇️ A CORREÇÃO ESTÁ AQUI ⬇️⬇️
//
// Esta interface define o "molde" dos dados do usuário que sua API retorna.
export interface UserData {
  id: number;
  nome: string;
  email: string;
}
//
// ⬆️⬆️ FIM DA CORREÇÃO ⬆️⬆️
//

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3001';

  private readonly USER_STORAGE_KEY = 'activeUser';

  private _isAuthenticated = new BehaviorSubject<boolean>(this.hasSession());
  
  public isAuthenticated$ = this._isAuthenticated.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  private hasSession(): boolean {
    return !!localStorage.getItem(this.USER_STORAGE_KEY);
  }

  /**
   * Método de Login:
   */
  // Agora o TypeScript sabe o que é 'UserData'
  login(credentials: { nome: string, senha: string }): Observable<UserData> {
    // E aqui também
    return this.http.post<UserData>(`${this.apiUrl}/login`, credentials).pipe(
      tap(userData => { // O TypeScript infere 'userData' como tipo UserData
        
        localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(userData));
        
        this._isAuthenticated.next(true);
      }),
      catchError((err: HttpErrorResponse) => {
        this._isAuthenticated.next(false);
        return throwError(() => err);
      })
    );
  }

  /**
   * Método de Logout:
   */
  logout(): void {
    localStorage.removeItem(this.USER_STORAGE_KEY);
    this._isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  /**
   * Getter público para os Guards (verificação síncrona).
   */
  public isAuthenticated(): boolean {
    return this._isAuthenticated.getValue();
  }

  /**
   * (Bônus) Pega os dados do usuário logado, se houver.
   */
  // E aqui também
  public getActiveUser(): UserData | null {
    const userData = localStorage.getItem(this.USER_STORAGE_KEY);
    if (userData) {
      return JSON.parse(userData) as UserData;
    }
    return null;
  }
}