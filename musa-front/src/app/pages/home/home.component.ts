import { Component } from '@angular/core';
import { PostCreatorComponent } from '../../components/post-creator/post-creator.component';

@Component({
  selector: 'app-home',
  imports: [PostCreatorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
