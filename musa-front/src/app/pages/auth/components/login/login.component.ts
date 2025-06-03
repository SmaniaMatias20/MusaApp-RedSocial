import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from '../../../../services/auth/auth.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  message: string = '';
  isError: boolean = false;
  isPasswordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required]],  // Puede ser username o email
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,15}$/)
        ]
      ]
    });
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  async login(): Promise<void> {
    if (this.loginForm.invalid) {
      this.message = 'Completá todos los campos correctamente.';
      this.isError = true;
      return;
    }

    const { usernameOrEmail, password } = this.loginForm.value;

    try {
      const user = await lastValueFrom(this.authService.login(usernameOrEmail, password));

      this.router.navigate(['/home']);
      this.message = `Bienvenido, ${user.firstName}!`;
      this.isError = false;

    } catch (error: any) {
      this.message = 'Credenciales inválidas o error en el servidor.';
      this.isError = true;
      console.error('Error en login():', error);
    }
  }
}
