import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  private readonly userId: number;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Nie jesteś zalogowany!');

    const payload = JSON.parse(atob(token.split('.')[1]));
    this.userId = payload.id;
  }

  getHistory(): Observable<HistoryEntry[]> {
    return this.http
      .get<HistoryEntry[]>(`${this.apiUrl}/${this.userId}`)
      .pipe(
        map(entries => entries.map(e => ({ ...e, createdAt: new Date(e.createdAt) })))
      );
  }

  addToHistory(
    originalText: string,
    translatedText: string,
    targetLang: string
  ): Observable<HistoryEntry> {
    return this.http.post<HistoryEntry>(this.apiUrl, {
      userId: this.userId,
      originalText,
      translatedText,
      targetLang
    });
  }

  deleteEntry(id: number): Observable<ApiMessageResponse> {
    return this.http.delete<ApiMessageResponse>(`${this.apiUrl}/${id}`);
  }

  clearHistory(): Observable<ApiMessageResponse> {
    return this.http.delete<ApiMessageResponse>(`${this.apiUrl}/user/${this.userId}`);
  }

  updateEntry(
    id: number,
    originalText: string,
    translatedText: string,
    targetLang: string
  ): Observable<HistoryEntry> {
    return this.http.put<HistoryEntry>(`${this.apiUrl}/${id}`, {
      originalText,
      translatedText,
      targetLang
    });
  }
}
