import { PostsService } from './../../../core/auth/services/posts/posts.service';
import { Component, inject, Input, input, OnInit } from '@angular/core';
import { CommentsService } from '../../../core/auth/services/comments/comments.service';
import { Ipost } from '../../../core/models/Iposts/ipost.interface';
import { Icomment } from '../../../core/models/icomments/icomment.interface';

@Component({
  selector: 'app-comments',
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {
  private readonly commentsService = inject(CommentsService);
  @Input({ required: true }) PostId!: string;

  loading: boolean = false;
  ngOnInit(): void {
    this.getAllComments();
  }

  commentInfo: Icomment[] = [];
  getAllComments(): void {
    this.loading = true;
    this.commentsService.getAllComments(this.PostId).subscribe({
      next: (res) => {
        if (res.success) {
          this.commentInfo = res.data.comments;
          this.loading = false;
        }
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }
}
