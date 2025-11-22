import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private apiUrl = 'http://localhost:3000/translate';

  constructor(private http: HttpClient) {}

  translate(text: string, targetLang: string): Observable<any> {
    return this.http.post(this.apiUrl, { text, targetLang });
  }
}
