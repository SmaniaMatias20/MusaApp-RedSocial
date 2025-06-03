import { Component } from '@angular/core';
import { PostCreatorComponent } from '../../components/post-creator/post-creator.component';
import { PostComponent } from '../../components/post/post.component';

@Component({
  selector: 'app-home',
  imports: [PostCreatorComponent, PostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
