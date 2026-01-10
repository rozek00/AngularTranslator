import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagesService} from './language.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-language',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-language.html',
  styleUrls: ['./select-language.css'],
})
export class SelectLanguage {
  public languages: Record<string, string> = {};
  languageCodes: string[] = [];
  public selectedLanguage: string = '';

  select(code: string) {
    this.selectedLanguage = code;
  }
  constructor(private languagesService: LanguagesService) {}

  ngOnInit() {
    this.languagesService.getLanguages().subscribe(data => {
      this.languages = data;
      this.languageCodes = Object.keys(data);
    });
  }

  RadomLan(){
    const keys = Object.keys(this.languages);
    const index = Math.floor(Math.random() * keys.length);
    const code = keys[index];

    const name = this.languages[code];

    this.selectedLanguage = code;  }
}
