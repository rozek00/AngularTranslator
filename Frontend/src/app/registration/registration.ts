import { Component } from '@angular/core';
import { Loginfield } from '../loginfield/loginfield';
import { Passwordfield } from '../passwordfield/passwordfield';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [Loginfield,Passwordfield],
  templateUrl: './registration.html',
  styleUrls: ['./registration.css'],
})
export class Registration {
  Login = '';
  Password = '';
  SecondPassword = '';
  handleLogin(val: string) {
    this.Login = val;
  }
  handlePassword(val: string) {
    this.Password = val;
  }
  handleSecondPassword(val: string) {
    this.SecondPassword = val;
  }
  RegisterLogic() {
    if(this.Password !== this.SecondPassword){
      //dodajcie jakis komunikat w komponenie
      return;
    }
    //wasza robota
  }
}
