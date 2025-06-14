import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user.model';
import { UserService } from '../../../../services/user/user.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { lastValueFrom } from 'rxjs';
import { EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  imports: [FormsModule, NgIf],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  successMessage: string = '';
  errorMessage: string = '';
  @Output() updatedUser = new EventEmitter<void>();
  user: User = {} as User;
  imagePreview: string | null = null;
  imageFile: File | null = null;
  idUser = localStorage.getItem('id') || '';

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const user = this.authService.currentUser();
    if (user) {
      this.user = { ...user };
      this.imagePreview = user.profileImage || null;
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
    const formData = new FormData();
    Object.entries(this.user).forEach(([key, value]) => {
      if (
        key !== 'profileImage' &&
        key !== 'id' &&
        key !== 'accessToken' &&
        key !== 'createdAt' &&
        key !== 'show' &&
        value !== null &&
        value !== ''
      ) {
        formData.append(key, value ?? '');
      }
    });

    if (this.imageFile) {
      formData.append('profileImage', this.imageFile);
    }

    try {
      await lastValueFrom(this.userService.updateUser(this.idUser, formData));
      this.successMessage = 'Perfil actualizado correctamente';
      setTimeout(() => {
        this.updatedUser.emit();
      }, 2000);
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      this.errorMessage = 'Ocurrió un error al guardar los cambios. Intente nuevamente.';
    }
  }
}
