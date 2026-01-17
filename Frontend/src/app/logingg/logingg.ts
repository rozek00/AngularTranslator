import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LogService } from '../services/logingg/logingg.service';

@Component({
  selector: 'app-logingg',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './logingg.html',
  styleUrls: ['./logingg.css']
})
export class Logingg {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: LogService, private route: Router) {
    this.loginForm = this.fb.group({
      Login: ['', [this.loginValidator()]],
      Password: ['', [this.passwordValidator()]],
      RememberMe: [false]  
    });
  }

  loginValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;
      const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
      if (!value) return { required: true };
      return emailPattern.test(value) ? null : { invalidEmail: true };
    };
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;
      if (!value) return { required: true };
      if (value.length < 6) return { minLength: true };
      if (!/\d/.test(value)) return { noNumber: true }; 
      return null;
    };
  }

  reactiveLogging() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); 
      return;
    }

    const login = this.loginForm.value.Login;
    const password = this.loginForm.value.Password;

    this.auth.login(login, password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        alert('Zalogowano pomyślnie!');
        this.route.navigate(['/dashboard']);
      },
      error: () => alert('Błędny login lub hasło')
    });
  }

  logout() {
    this.auth.logout();
    this.route.navigate(['/dashboard']);
  }
}
