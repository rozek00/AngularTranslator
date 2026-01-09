import { Component } from '@angular/core';
import { Loginfield } from '../loginfield/loginfield';
import { Passwordfield } from '../passwordfield/passwordfield';
import { LogService } from '../services/logingg/logingg.service'
import { Router } from '@angular/router';

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

  constructor(private auth: LogService, private router: Router ) {}

  RegisterLogic() {
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
