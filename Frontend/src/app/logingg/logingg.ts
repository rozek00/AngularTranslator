import { Component } from '@angular/core';
import { Loginfield } from '../loginfield/loginfield';
import { Passwordfield } from '../passwordfield/passwordfield';

@Component({
  selector: 'app-logingg',
  standalone: true,
  imports: [Loginfield,Passwordfield],
  templateUrl: './logingg.html',
  styleUrls: ['./logingg.css'],
})
export class Logingg {
  Login = '';
  Password = '';
  handleLogin(val: string) {
    this.Login = val;
}
  handlePassword(val: string) {
    this.Password = val;
  }
  loggingLogic() {
    //wasza robota
  }
}
