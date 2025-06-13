import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user.model';
import { UserService } from '../../../../services/user/user.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  imports: [FormsModule, NgIf],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
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
      alert('No se encontró el usuario en localStorage');
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

  saveChanges() {
    const formData = new FormData();
    Object.entries(this.user).forEach(([key, value]) => {
      if (key !== 'profileImage' && key !== 'id') {
        formData.append(key, value ?? '');
      }
    });

    if (this.imageFile) {
      formData.append('profileImage', this.imageFile);
    }

    this.userService.updateUser(this.idUser, formData).subscribe(() => {
      alert('Perfil actualizado correctamente');
    });
  }
}
