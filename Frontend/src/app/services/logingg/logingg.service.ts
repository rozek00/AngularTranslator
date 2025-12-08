import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { AuthResponse } from '../../interfaces/responses/loginResponse';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
      return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
