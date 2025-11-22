import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OriginalWordArea } from './original-word-area/original-word-area';
import { TranslatedWordArea } from './translated-word-area/translated-word-area';
import { SelectLanguage } from './select-language/select-language';
import { TranslateService } from './translate.service';
import { FormsModule } from '@angular/forms';
import { LanguagesService } from './select-language/language.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [OriginalWordArea, TranslatedWordArea, SelectLanguage, FormsModule]
})

export class App {
  constructor(private translateService: TranslateService) {}
  protected title = 'Frontend'; 
  translatedText: string = "";
  @ViewChild(OriginalWordArea) originalWordArea!: OriginalWordArea;
  @ViewChild(SelectLanguage) selectLanguage!: SelectLanguage;
  Translate()
  {
    const langcode = this.selectLanguage?.selectedLanguage ?? '';
    if (!langcode) {
      console.warn('Nie wybrano języka docelowego.');
      return;
    }
    this.translateService.translate(this.originalWordArea.originalText, langcode).subscribe({
      next: (res) => {
        this.translatedText = res.translations[0].text;
      },
      error: (err) => console.error(err)
    });
  }
}
