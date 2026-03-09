import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CreatePostComponent } from '../../shared/post/create-post/create-post.component';
import { SinglepostComponent } from '../../shared/post/siglepost/singlepost/singlepost.component';
import { FollowsuggComponent } from './fowllowsug/followsugg/followsugg.component';
import { ShortspageComponent } from './shorts/shortspage/shortspage.component';

@Component({
  selector: 'app-feed',
  imports: [CreatePostComponent, SinglepostComponent, FollowsuggComponent, ShortspageComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {
  activeTab: boolean = false;
}
