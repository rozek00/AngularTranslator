import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LogService } from '../services/logingg/logingg.service';
import { CommonModule } from '@angular/common';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('Password')?.value;
  const confirm = control.get('SecondPassword')?.value;
  return password && confirm && password !== confirm ? { passwordsMismatch: true } : null;
};

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.html',
  styleUrls: ['./registration.css']
})
export class Registration {
  registerForm: FormGroup;
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

  constructor(private fb: FormBuilder, private auth: LogService, private router: Router) {
    this.registerForm = this.fb.group({
      Login: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      SecondPassword: ['', [Validators.required]]
    }, { validators: passwordMatchValidator });
  }

  RegisterLogic() {
    if (this.registerForm.invalid) return;

    const { Login, Password } = this.registerForm.value;

    this.auth.create(Login, Password).subscribe({
      next: () => {
        alert('Zarejestrowano pomyślnie!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        if (err.status === 409) {
          this.registerForm.controls['Login'].setErrors({ conflict: true });
        } else {
          this.registerForm.controls['Login'].setErrors({ unknown: true });
        }
      }
    });
  }
}
