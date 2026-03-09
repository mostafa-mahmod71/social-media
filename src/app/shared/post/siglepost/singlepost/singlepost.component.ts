import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Ipost } from '../../../../core/models/Iposts/ipost.interface';
import { PostsService } from '../../../../core/auth/services/posts/posts.service';
import { CommentsComponent } from '../../../comments/comments/comments.component';
import { RouterLink } from '@angular/router';
import { LoadingpostsComponent } from '../loadingposts/loadingposts/loadingposts.component';
import { Userinfo } from '../../../../userinfo.interface';

@Component({
  selector: 'app-singlepost',
  imports: [CommentsComponent, RouterLink, LoadingpostsComponent],
  templateUrl: './singlepost.component.html',
  styleUrl: './singlepost.component.css',
})
export class SinglepostComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  @ViewChild(CommentsComponent) commentscomp!: CommentsComponent;
  loadingposts: boolean = true;

  ngOnInit(): void {
    this.getAllPosts();
  }
  posts: Ipost[] = [];
  userId: Userinfo = JSON.parse(localStorage.getItem('socialUser') || '{}');

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

  /// update

  updatePost(postId: string, postbody: string, img: any) {
    const newbody = prompt('edit post description', postbody);
    const formdata = new FormData();
    if (newbody) {
      formdata.append('body', newbody);
    }
    if (img.files) {
      formdata.append('image', img);
    }
    this.postsService.updatepost(formdata, postId).subscribe({
      next: (res) => {
        this.getAllPosts();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //// like && unlike

  // liked: string =

  likeUnpost(postId: string): void {
    this.postsService.likeUnPosts(postId).subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
