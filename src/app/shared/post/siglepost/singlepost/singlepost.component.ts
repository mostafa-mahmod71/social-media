import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Ipost } from '../../../../core/models/Iposts/ipost.interface';
import { PostsService } from '../../../../core/auth/services/posts/posts.service';
import { CommentsComponent } from '../../../comments/comments/comments.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentsService } from '../../../../core/auth/services/comments/comments.service';

@Component({
  selector: 'app-singlepost',
  imports: [CommentsComponent, ReactiveFormsModule],
  templateUrl: './singlepost.component.html',
  styleUrl: './singlepost.component.css',
})
export class SinglepostComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  private readonly commentsService = inject(CommentsService);
  // private readonly commentsComponent = inject(CommentsComponent);
  @ViewChild(CommentsComponent) commentcomp!: CommentsComponent;

  ngOnInit(): void {
    this.getAllPosts();
  }
  posts: Ipost[] = [];

  getAllPosts(): void {
    this.postsService.getAllPosts().subscribe({
      next: (res) => {
        if (res.message == 'success') {
          this.posts = res.data.posts;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
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
            this.commentcomp?.getAllComments();
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
