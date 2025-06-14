import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { birthDateValidator, passwordMatchValidator } from '../../../../utils/utils';
import { UserService } from '../../../../services/user/user.service';
import { lastValueFrom } from 'rxjs';
import { EventEmitter, Output } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf]
})
export class CreateUserComponent implements OnInit {
  @Output() userCreated = new EventEmitter<void>();
  isPasswordVisible: boolean = false;
  registerForm!: FormGroup;
  defaultImage = 'https://res.cloudinary.com/dqqaf002m/image/upload/v1749215793/user_dykckk.jpg';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,15}$/)
      ]],
      confirmPassword: ['', Validators.required],
      birthDate: ['', [Validators.required, birthDateValidator]],
      description: ['', [Validators.maxLength(250)]],
      profileImage: [this.defaultImage],
      isAdmin: ['', [Validators.required, Validators.pattern(/^(true|false)$/)]],
      createdAt: new Date().toISOString(),
      show: true

    }, { validators: passwordMatchValidator });
  }

  async onSubmit() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor completa los campos correctamente.';
      this.registerForm.markAllAsTouched();
      return;
    }

    const values = this.registerForm.value;

    // Removemos el campo que no se debe enviar
    const { confirmPassword, ...userData } = values;

    try {
      await lastValueFrom(this.userService.createUser(userData));
      this.successMessage = 'Usuario creado correctamente.';
      this.registerForm.reset();
      this.errorMessage = '';
      setTimeout(() => this.userCreated.emit(), 2000);
    } catch (error: any) {
      console.error('Error al crear el usuario:', error);
      this.errorMessage = error?.error?.message || 'Error al crear el usuario.';
      this.successMessage = '';
    }
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }


}
