import { Component } from '@angular/core';
import { Loginfield } from '../loginfield/loginfield';
import { Passwordfield } from '../passwordfield/passwordfield';
import { LogService } from '../services/logingg/logingg.service'
import { Router } from '@angular/router';
import { ErrorMesage } from '../error-message/error-message';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [Loginfield,Passwordfield, ErrorMesage],
  templateUrl: './registration.html',
  styleUrls: ['./registration.css'],
})
export class Registration {
  Login = '';
  Password = '';
  SecondPassword = '';
  errorMessageLogin = '';
  errorMessagePassowrd ='';
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;


  handleLogin(val: string) {
    if(this.emailPattern.test(val)){
      this.errorMessageLogin = '';
      this.Password = '';
    }
    this.Login = val;
  }
  handlePassword(val: string) {
    if(val.length < 6){
      this.errorMessagePassowrd = '';
    }

    this.Password = val;
  }

  handleSecondPassword(val: string) {
    if(val.length < 6){
      this.errorMessagePassowrd = '';
    }

    this.SecondPassword = val;
  }

  constructor(private auth: LogService, private router: Router ) {}

  RegisterLogic() {
    if (!this.emailPattern.test(this.Login)) {
      this.errorMessageLogin = 'Bledny format loginu'; 
      return;
    } 
    
    if(this.Password.length < 6){
      this.errorMessagePassowrd = 'Bledny format hasla';
      return
    }

    if(this.Password !== this.SecondPassword){
      this.errorMessagePassowrd = 'Rozne hasla'; 
      return;
    }


    this.auth.create(this.Login,this.Password).subscribe({
        next: (res) =>{
          alert('Zarejestrowano pomyślnie!');   
          this.router.navigate(['/dashboard/login']);
        },
        error: (err) => {
          if (err.status === 409) {
            this.errorMessageLogin = err.error.message;
          } else {
            this.errorMessageLogin = 'Cos poszlo nie tak';
          }
        }
    })
  }
}
