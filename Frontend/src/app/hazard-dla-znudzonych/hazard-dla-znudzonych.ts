import { Component } from '@angular/core';

@Component({
  selector: 'app-hazard-dla-znudzonych',
  imports: [],
  templateUrl: './hazard-dla-znudzonych.html',
  styleUrl: './hazard-dla-znudzonych.css',
})
export class HazardDlaZnudzonych {
  symbols = ['🍒', '🍋', '⭐', '🔔'];

result = ['', '', ''];
  spinning = false;

  // indicates last spin was win (all equal)
  isWin = false;

spin() {
  if (this.spinning) return;
  this.spinning = true;
  this.isWin = false;

  // Quick visual cycling while spinning
  const interval = setInterval(() => {
    this.result = [this.randomSymbol(), this.randomSymbol(), this.randomSymbol()];
  }, 80);

  // After short delay pick final values
  setTimeout(() => {
    clearInterval(interval);
    this.result = [this.randomSymbol(), this.randomSymbol(), this.randomSymbol()];
    this.isWin = this.result[0] === this.result[1] && this.result[1] === this.result[2];
    this.spinning = false;
  }, 900);
}

randomSymbol() {
  return this.symbols[Math.floor(Math.random() * this.symbols.length)];
}
}
