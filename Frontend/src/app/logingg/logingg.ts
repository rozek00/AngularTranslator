import { Component } from '@angular/core';
import { Loginfield } from '../loginfield/loginfield';
import { Passwordfield } from '../passwordfield/passwordfield';
import { concatWith } from 'rxjs';
import { AuthResponse } from '../interfaces/responses/loginResponse';
import { LogService } from '../services/logingg/logingg.service'
import { Router } from '@angular/router';
import { ErrorMesage } from '../error-message/error-message';

@Component({
  selector: 'app-logingg',
  standalone: true,
  imports: [Loginfield,Passwordfield, ErrorMesage],
  templateUrl: './logingg.html',
  styleUrls: ['./logingg.css'],
})

export class Logingg {
  Login = '';
  Password = '';
  errorMessageLogin = '';
  errorMessagePassowrd = '';
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;


  handleLogin(val: string) {
    if(this.emailPattern.test(val)){
      this.errorMessageLogin = '';
      this.errorMessagePassowrd = '';
    }
    this.Login = val;
  }

  handlePassword(val: string) {
    if(val.length < 6){
      this.errorMessagePassowrd = '';
    }
    this.Password = val;
  }

  
  constructor(private auth: LogService, private route: Router ) {}

  loggingLogic() {  

  if (!this.emailPattern.test(this.Login)) {
    this.errorMessageLogin = 'Bledny format loginu'; 
    return;
  } 

  if(this.Password.length < 6){
    this.errorMessagePassowrd = 'Bledny format hasla';
    return
  }

    this.auth.login(this.Login, this.Password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        alert('Zalogowano pomyślnie!');   
        this.route.navigate(['/dashboard']);
      },
      error: (err) => this.errorMessagePassowrd = "Bledny login lub haslo"
    });
  }

  logout() {
    this.auth.logout();
    this.route.navigate(['/dashboard']);
  }
}
