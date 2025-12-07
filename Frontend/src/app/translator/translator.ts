import { Component, ViewChild } from '@angular/core';
import { OriginalWordArea } from '../original-word-area/original-word-area';
import { TranslatedWordArea } from '../translated-word-area/translated-word-area';
import { SelectLanguage } from '../select-language/select-language';
import { TranslateService } from '../translate.service';
import { HistoryService } from '../history.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-translator',
  standalone: true,
  imports: [OriginalWordArea, TranslatedWordArea, SelectLanguage, FormsModule],
  templateUrl: './translator.html',
  styleUrls: ['./translator.css'],
})
export class TranslatorComponent {
  constructor(
    private translateService: TranslateService,
    private historyService: HistoryService
  ) {}
  translatedText: string = "";
  @ViewChild(OriginalWordArea) originalWordArea!: OriginalWordArea;
  @ViewChild(SelectLanguage) selectLanguage!: SelectLanguage;

  Translate() {
    const langcode = this.selectLanguage?.selectedLanguage ?? '';
    if (!langcode) {
      console.warn('Nie wybrano języka docelowego.');
      return;
    }
    const wordToTranslate = this.originalWordArea.originalText;
    if (!wordToTranslate) {
      console.warn('Brak tekstu do tłumaczenia.');
      return;
    }
    this.translateService.translate(wordToTranslate, langcode).subscribe({
      next: (res) => {
        this.translatedText = res.translations[0].text;

        this.historyService.addToHistory(
          wordToTranslate,
          this.translatedText,
          langcode
        ).subscribe();
      },
      error: (err) => console.error(err)
    });
  }
}
