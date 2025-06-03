import { Component } from '@angular/core';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';

@Component({
  selector: 'app-profile',
  imports: [ProfileHeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
