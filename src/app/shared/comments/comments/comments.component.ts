import { Userinfo } from './../../../userinfo.interface';
import { Component, inject, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../../core/auth/services/comments/comments.service';
import { Ipost } from '../../../core/models/Iposts/ipost.interface';
import { Icomment } from '../../../core/models/icomments/icomment.interface';
import { CreatecommentComponent } from '../createcomment/createcomment/createcomment.component';
import { LoadcommentsComponent } from '../loadcomments/loadcomments/loadcomments.component';

@Component({
  selector: 'app-comments',
  imports: [CreatecommentComponent, LoadcommentsComponent],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {
  private readonly commentsService = inject(CommentsService);
  @Input({ required: true }) PostId!: string;

  loadingcomment: boolean = true;
  ngOnInit(): void {
    this.getAllComments();
  }
  userinfo: Userinfo = JSON.parse(localStorage.getItem('socialUser') || '{}');
  commentInfo: Icomment[] = [];
  getAllComments(): void {
    this.loadingcomment = true;
    this.commentsService.getAllComments(this.PostId).subscribe({
      next: (res) => {
        if (res.success) {
          this.commentInfo = res.data.comments;
          this.loadingcomment = false;
        }
      },
      error: (err) => {
        console.log(err);
        this.loadingcomment = false;
      },
    });
  }

  getDaysDiff(date: string) {
    const diff = new Date().getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days === 0 ? 'today' : `from ${days} days`;
  }

  isDropdownOpen: string | null = null;

  showdropdown(event: Event, commentId: string) {
    event.stopPropagation();
    if (commentId === this.isDropdownOpen) {
      this.isDropdownOpen = null;
    } else {
      this.isDropdownOpen = commentId;
    }
  }

  deletComment(postId: string, commentId: string): void {
    this.commentsService.deletComment(postId, commentId).subscribe({
      next: (res) => {
        this.getAllComments();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updatcomm(postId: string, commId: string, commbody: string) {
    const newbody = prompt('edit comment', commbody);
    const formdata = new FormData();
    if (newbody) {
      formdata.append('content', newbody);
    }
    this.commentsService.updatecomment(postId, commId, formdata).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllComments();
        this.isDropdownOpen = null;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
