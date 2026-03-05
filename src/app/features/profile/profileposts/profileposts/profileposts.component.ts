import { Userinfo } from './../../../../userinfo.interface';
import { Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { PostsService } from '../../../../core/auth/services/posts/posts.service';
import { Ipost } from '../../../../core/models/Iposts/ipost.interface';
import { LoadingpostsComponent } from '../../../../shared/post/siglepost/loadingposts/loadingposts/loadingposts.component';
import { RouterLink } from '@angular/router';
import { CommentsComponent } from '../../../../shared/comments/comments/comments.component';

@Component({
  selector: 'app-profileposts',
  imports: [LoadingpostsComponent, RouterLink, CommentsComponent],
  templateUrl: './profileposts.component.html',
  styleUrl: './profileposts.component.css',
})
export class ProfilepostsComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  @ViewChild(CommentsComponent) commentscomp!: CommentsComponent;

  userInfo: Userinfo = JSON.parse(localStorage.getItem('socialUser') || '{}');
  loadingposts: boolean = true;
  posts: Ipost[] = [];
  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts(): void {
    this.loadingposts = true;
    this.postsService.getAllPosts().subscribe({
      next: (res) => {
        if (res.message == 'success') {
          this.posts = res.data.posts;
          this.loadingposts = false;
        }
      },
      error: (err) => {
        console.log(err);
        this.loadingposts = false;
      },
    });
  }

  ////// date && times
  getDaysDiff(date: string) {
    const diff = new Date().getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days === 0 ? 'today' : `from ${days} days`;
  }

  reloadcomments(): void {
    if (this.commentscomp) {
      this.commentscomp.getAllComments();
    }
  }

  // delet && edit posts

  isDropdownOpen: string | null = null;
  private eRef = inject(ElementRef);

  showdropdown(event: Event, postId: string) {
    event.stopPropagation();
    if (postId === this.isDropdownOpen) {
      this.isDropdownOpen = null;
    } else {
      this.isDropdownOpen = postId;
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    this.isDropdownOpen = null;
  }

  deletpost(postId: string): void {
    this.postsService.deletpost(postId).subscribe({
      next: (res) => {
        if (res.success) {
          this.getAllPosts();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
