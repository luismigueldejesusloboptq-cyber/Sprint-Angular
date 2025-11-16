import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';



export interface UserData {
  id: number;
  nome: string;
  email: string;
}




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

 
  login(credentials: { nome: string, senha: string }): Observable<UserData> {
    
    return this.http.post<UserData>(`${this.apiUrl}/login`, credentials).pipe(
      tap(userData => { 
        
        localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(userData));
        
        this._isAuthenticated.next(true);
      }),
      catchError((err: HttpErrorResponse) => {
        this._isAuthenticated.next(false);
        return throwError(() => err);
      })
    );
  }

 
  logout(): void {
    localStorage.removeItem(this.USER_STORAGE_KEY);
    this._isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  
  public isAuthenticated(): boolean {
    return this._isAuthenticated.getValue();
  }


  public getActiveUser(): UserData | null {
    const userData = localStorage.getItem(this.USER_STORAGE_KEY);
    if (userData) {
      return JSON.parse(userData) as UserData;
    }
    return null;
  }
}