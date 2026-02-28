import { Observable } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostsService } from '../../../core/auth/services/posts/posts.service';
import { Ipost } from '../../../core/models/Iposts/ipost.interface';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentsService } from '../../../core/auth/services/comments/comments.service';
import { CommentsComponent } from '../../../shared/comments/comments/comments.component';

@Component({
  selector: 'app-post-details',
  imports: [CommentsComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly postsService = inject(PostsService);
  private readonly commentsService = inject(CommentsService);
  postId: string | null = null;

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
    this.postsService.getSinglePost(this.postId).subscribe({
      next: (res) => {
        if (res.success) {
          this.postDetails = res.data.post;
          console.log(res);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ////// date && times
  getDaysDiff(date: string) {
    const diff = new Date().getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days === 0 ? 'today' : `from ${days} days`;
  }

  ////// comments

  crcomment: FormControl = new FormControl('', [Validators.required]);

  createComment(e: SubmitEvent | Event, id: string): void {
    e.preventDefault();
    if (this.crcomment.value) {
      let formdata = new FormData();
      formdata.append('content', this.crcomment.value);

      this.commentsService.createComment(formdata, id).subscribe({
        next: (res) => {
          if (res.success) {
            this.crcomment.reset();
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
