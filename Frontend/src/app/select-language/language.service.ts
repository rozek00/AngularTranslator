import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  constructor(private http: HttpClient) {}

  getLanguages(): Observable<Record<string, string>> {
    return this.http.get<Record<string, string>>('languages.json');
  }
}
