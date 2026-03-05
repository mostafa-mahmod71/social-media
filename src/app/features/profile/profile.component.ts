import { Component } from '@angular/core';
import { Userinfo } from '../../userinfo.interface';
import { ProfilepostsComponent } from './profileposts/profileposts/profileposts.component';
import { CreatePostComponent } from '../../shared/post/create-post/create-post.component';

@Component({
  selector: 'app-profile',
  imports: [ProfilepostsComponent, CreatePostComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  Userinfo: Userinfo = JSON.parse(localStorage.getItem('socialUser') || '{}');
}
