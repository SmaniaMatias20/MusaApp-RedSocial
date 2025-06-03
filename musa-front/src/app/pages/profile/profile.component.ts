import { Component } from '@angular/core';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { PostComponent } from '../../components/post/post.component';

@Component({
  selector: 'app-profile',
  imports: [ProfileHeaderComponent, PostComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
