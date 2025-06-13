import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from '../../../../services/auth/auth.service';
import { SpinnerComponent } from '../../../../components/spinner/spinner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string = '';
  loginForm: FormGroup;
  message: string = '';
  isError: boolean = false;
  isPasswordVisible: boolean = false;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required]],
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
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.markAllFieldsAsTouched(this.loginForm);
      this.errorMessage = 'Por favor completa el formulario correctamente';
      return;
    }


    const { usernameOrEmail, password } = this.loginForm.value;

    try {
      this.loading = true;
      await this.authService.login(usernameOrEmail, password);
      this.isError = false;
      this.loading = false;
      this.message = 'Sesión iniciada con éxito.';
    } catch (error: any) {
      this.message = error;
      this.isError = true;
    }
  }

  private markAllFieldsAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markAllFieldsAsTouched(control as FormGroup);
      }
    });
  }

}
