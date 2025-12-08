import { Component } from '@angular/core';
import { Loginfield } from '../loginfield/loginfield';
import { Passwordfield } from '../passwordfield/passwordfield';
import { concatWith } from 'rxjs';
import { AuthResponse } from '../interfaces/responses/loginResponse';
import { LogService } from '../services/logingg/logingg.service'


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

  
  constructor(private auth: LogService) {}

  loggingLogic() {
    this.auth.login(this.Login, this.Password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
              alert('Zalogowano pomyślnie!');   // komunikat dla użytkownika

      },
      error: (err) => console.error('Błąd logowania:', err)
    });
  }

  logout() {
    this.auth.logout();
  }
}
