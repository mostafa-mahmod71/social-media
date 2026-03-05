import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CreatePostComponent } from '../../shared/post/create-post/create-post.component';
import { SinglepostComponent } from '../../shared/post/siglepost/singlepost/singlepost.component';
import { PostsService } from '../../core/auth/services/posts/posts.service';
import { Ipost } from '../../core/models/Iposts/ipost.interface';
import { FollowsuggComponent } from './fowllowsug/followsugg/followsugg.component';

@Component({
  selector: 'app-feed',
  imports: [CreatePostComponent, SinglepostComponent, FollowsuggComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {
  activeTab: boolean = false;
}
