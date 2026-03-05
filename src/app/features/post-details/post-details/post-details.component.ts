import { Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostsService } from '../../../core/auth/services/posts/posts.service';
import { Ipost } from '../../../core/models/Iposts/ipost.interface';
import { CommentsComponent } from '../../../shared/comments/comments/comments.component';

@Component({
  selector: 'app-post-details',
  imports: [CommentsComponent, RouterLink],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly postsService = inject(PostsService);
  private readonly router = inject(Router);
  @ViewChild(CommentsComponent) commentscomp!: CommentsComponent;

  postId: string | null = '';

  ngOnInit(): void {
    this.getIdFromPostUrl();
  }

  getIdFromPostUrl(): void {
    this.activatedRoute.paramMap.subscribe((urlpath) => {
      this.postId = urlpath.get('id');
      this.getPostDetails();
    });
  }

  postDetails!: Ipost;
  getPostDetails() {
    if (this.postId) {
      this.postsService.getSinglePost(this.postId).subscribe({
        next: (res) => {
          if (res.success) {
            this.postDetails = res.data.post;
            this.reloadcomments();
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
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
          this.router.navigate(['/feed']);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
