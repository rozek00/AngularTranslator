import { Component } from '@angular/core';
import { Loginfield } from '../loginfield/loginfield';
import { Passwordfield } from '../passwordfield/passwordfield';
import { concatWith } from 'rxjs';

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
    console.log(this.Login);
    console.log(this.Password);
  }
}
