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

  isWin = false;

spin() {
  if (this.spinning) return;
  this.spinning = true;
  this.isWin = false;

  const interval = setInterval(() => {
    this.result = [this.randomSymbol(), this.randomSymbol(), this.randomSymbol()];
  }, 80);

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
