import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-translated-word-area',
  standalone: true,
  imports: [],
  templateUrl: './translated-word-area.html',
  styleUrls: ['./translated-word-area.css'],
})
export class TranslatedWordArea {
  @Input() translatedText: string = "";
}
