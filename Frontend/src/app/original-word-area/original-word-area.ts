import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-original-word-area',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './original-word-area.html',
  styleUrls: ['./original-word-area.css'],
})
export class OriginalWordArea {
  public originalText: string = "";
}
