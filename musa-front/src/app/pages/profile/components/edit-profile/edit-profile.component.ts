import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { UserService } from '../../../../services/user/user.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { lastValueFrom } from 'rxjs';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @Output() updatedUser = new EventEmitter<void>();
  form: FormGroup;
  user: User = {} as User;
  imagePreview: string | null = null;
  imageFile: File | null = null;
  successMessage: string = '';
  errorMessage: string = '';
  idUser = localStorage.getItem('id') || '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      firstName: ['', [Validators.minLength(3), Validators.maxLength(15)]],
      lastName: ['', [Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', [Validators.email]],
      username: ['', [Validators.minLength(3), Validators.maxLength(15)]],
      password: ['', [
        Validators.minLength(8),
        Validators.maxLength(15),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,15}$/)
      ]],
      birthDate: ['', [this.optionalBirthDateValidator]],
      description: ['', [Validators.maxLength(250)]],
    });
  }

  ngOnInit(): void {
    const currentUser = this.authService.currentUser();
    if (currentUser) {
      this.user = { ...currentUser };
      this.imagePreview = currentUser.profileImage || null;
      this.form.patchValue({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        username: currentUser.username,
        birthDate: currentUser.birthDate,
        description: currentUser.description
      });
    } else {
      console.error('No se encontró el usuario en localStorage');
    }
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.imagePreview = null;
    this.imageFile = null;
    this.user.profileImage = '';
  }

  async saveChanges() {
    if (this.form.invalid) {
      this.errorMessage = 'Verifica que los campos ingresados sean válidos.';
      this.markAllFieldsAsTouched(this.form);
      return;
    }

    const formData = new FormData();
    const values = this.form.value;

    Object.entries(values).forEach(([key, value]) => {
      const originalValue = this.user[key as keyof User];
      const hasChanged = value !== '' && value !== null && value !== undefined && value !== originalValue;

      if (hasChanged) {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    if (this.imageFile) {
      formData.append('profileImage', this.imageFile);
    }

    try {
      await lastValueFrom(this.userService.updateUser(this.idUser, formData));
      this.successMessage = 'Perfil actualizado correctamente';
      this.authService.updateUser(formData);
      setTimeout(() => this.updatedUser.emit(), 2000);
    } catch (error: any) {
      console.error('Error al actualizar el perfil:', error);

      if (error.error && error.error.message) {
        this.errorMessage = error.error.message;
      } else {
        this.errorMessage = 'Error al actualizar el perfil';
      }
    }
  }


  private optionalBirthDateValidator(control: AbstractControl) {
    if (!control.value) return null;
    const birthDate = new Date(control.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age >= 18 ? null : { underage: true };
  }

  private markAllFieldsAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => control.markAsTouched());
  }

  // Para acceder fácilmente desde la plantilla
  get f() {
    return this.form.controls;
  }
}

