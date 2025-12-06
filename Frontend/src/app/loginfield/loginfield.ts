import { Component, Output, EventEmitter  } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loginfield',
  imports: [FormsModule],
  templateUrl: './loginfield.html',
  styleUrl: './loginfield.css',
})
export class Loginfield {
  login: string = "";
  @Output() valueChanged = new EventEmitter<string>();

  onValueChange() {
    this.valueChanged.emit(this.login);
  }
}
