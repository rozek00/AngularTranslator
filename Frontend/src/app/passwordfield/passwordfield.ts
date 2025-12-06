import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-passwordfield',
  imports: [FormsModule],
  templateUrl: './passwordfield.html',
  styleUrl: './passwordfield.css',
})
export class Passwordfield {
  password: string = "";
  show = false;
   @Output() valueChanged = new EventEmitter<string>();

  onValueChange() {
    this.valueChanged.emit(this.password);
  }
}
