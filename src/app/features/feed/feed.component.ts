import { Component, inject, OnInit } from '@angular/core';
import { CreatePostComponent } from '../../shared/post/create-post/create-post.component';
import { SinglepostComponent } from '../../shared/post/siglepost/singlepost/singlepost.component';
import { PostsService } from '../../core/auth/services/posts/posts.service';
import { Ipost } from '../../core/models/Iposts/ipost.interface';

@Component({
  selector: 'app-feed',
  imports: [CreatePostComponent, SinglepostComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {}
