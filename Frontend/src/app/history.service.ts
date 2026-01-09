import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Expansion } from '@angular/compiler';

export interface HistoryEntry {
  _id: number;
  userId: number;
  originalText: string;
  translatedText: string;
  targetLang: string;
  createdAt: Date;
}

export interface ApiMessageResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private readonly apiUrl = 'http://localhost:3000/history';
  private readonly userId: number | null = null;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    this.userId = payload.id;
  }
  else{
    console.warn('Nieprawidłowy token, działamy w trybie offline');
    this.userId = null;
  }
}
  
  getHistory(): Observable<HistoryEntry[]> {
    if(this.userId != null){
      return this.http
      .get<HistoryEntry[]>(`${this.apiUrl}/${this.userId}`)
      .pipe(
        map(entries => entries.map(e => ({ ...e, createdAt: new Date(e.createdAt) })))
      );
    }
    else{
      throw new Error("Nie zalogowano");
    }
  }

  addToHistory(
    originalText: string,
    translatedText: string,
    targetLang: string
  ): Observable<HistoryEntry> {
    if(this.userId != null){
      console.log(this.userId);
      return this.http.post<HistoryEntry>(this.apiUrl, {
      userId: this.userId,
      originalText,
      translatedText,
      targetLang});
    }
    else{
      throw new Error("Nie zalogowano");
    }
  }

  deleteEntry(id: number): Observable<ApiMessageResponse> {
    if(this.userId != null){
      return this.http.delete<ApiMessageResponse>(`${this.apiUrl}/${id}`);
    }
    else{
      throw new Error("Nie zalogowano");
    }
  }

  clearHistory(): Observable<ApiMessageResponse> {
    if(this.userId != null){
      return this.http.delete<ApiMessageResponse>(`${this.apiUrl}/user/${this.userId}`);
    }
    else{
      throw new Error("Nie zalogowano");
    }
  }

  updateEntry(
    id: number,
    originalText: string,
    translatedText: string,
    targetLang: string
  ): Observable<HistoryEntry> {
    if(this.userId != null){
      return this.http.put<HistoryEntry>(`${this.apiUrl}/${id}`, {
        originalText,
        translatedText,
        targetLang
      });
    }
    else{
      throw new Error("Nie zalogowano");
    }
  }
}
