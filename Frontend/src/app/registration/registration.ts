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
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;


  handleLogin(val: string) {
    if(this.emailPattern.test(val)){
      this.errorMessageLogin = '';
    }
    this.Login = val;
  }
  handlePassword(val: string) {
    this.Password = val;
  }
  handleSecondPassword(val: string) {
    this.SecondPassword = val;
  }

  constructor(private auth: LogService, private router: Router ) {}

  RegisterLogic() {
    if (!this.emailPattern.test(this.Login)) {
      this.errorMessageLogin = 'Bledny format loginu'; 
      return;
    } 
    
    if(this.Password !== this.SecondPassword){
      console.log("zle");
      return;
    }

    this.auth.create(this.Login,this.Password).subscribe({
        next: (res) =>{
          console.log(res)
          this.router.navigate(['/dashboard/login']);
        },
        error: (err) => console.error('Błąd logowania:', err)
    })
  }
}
