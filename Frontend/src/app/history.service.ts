import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HistoryEntry {
  _id: string;
  userId: string;
  originalText: string;
  translatedText: string;
  targetLang: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private apiUrl = 'http://localhost:3000/history';
  private userId: string;

  constructor(private http: HttpClient) {
    // Tymczasowy ID - później podmienicie na prawdziwego usera
    this.userId = localStorage.getItem('visitorId') || this.generateId();
  }

  private generateId(): string {
    const id = 'visitor_' + Math.random().toString(36).substring(2, 10);
    localStorage.setItem('visitorId', id);
    return id;
  }

  getHistory(): Observable<HistoryEntry[]> {
    return this.http.get<HistoryEntry[]>(`${this.apiUrl}/${this.userId}`);
  }

  addToHistory(originalText: string, translatedText: string, targetLang: string): Observable<HistoryEntry> {
    return this.http.post<HistoryEntry>(this.apiUrl, {
      userId: this.userId,
      originalText,
      translatedText,
      targetLang
    });
  }

  deleteEntry(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  clearHistory(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/${this.userId}`);
  }

  updateEntry(id: string, originalText: string, translatedText: string, targetLang: string): Observable<HistoryEntry> {
  return this.http.put<HistoryEntry>(`${this.apiUrl}/${id}`, {
    originalText,
    translatedText,
    targetLang
  });
}
}