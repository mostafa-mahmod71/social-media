import { SinglepostComponent } from './../siglepost/singlepost/singlepost.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Userinfo } from '../../../userinfo.interface';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { PostsService } from '../../../core/auth/services/posts/posts.service';
@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  private readonly postsService = inject(PostsService);
  @ViewChild('fileinpo') fileinpo!: ElementRef<HTMLInputElement>;
  // @ViewChild(SinglepostComponent) showposts!: SinglepostComponent;

  showmainmodal: boolean = false;
  Userinfo: Userinfo = JSON.parse(localStorage.getItem('socialUser') || '{}');
  confirmmodal: boolean = false;
  crPostMsg: string = '';
  shmodul(): void {
    this.crPostMsg = '';

    if (!this.confirmmodal) {
      this.showmainmodal = !this.showmainmodal;
    }
  }

  backCloseModal(): void {
    this.confirmmodal = !this.confirmmodal;
  }

  // uploaded file
  uploadedFileInfo: File | null = null;
  imgPreview: string | null = '';

  uploadfile(e: Event): void {
    let input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadedFileInfo = input.files[0];
      this.imgPreview = URL.createObjectURL(this.uploadedFileInfo);
    }
  }

  // clear preview
  clearpreview(): void {
    if (this.imgPreview) {
      URL.revokeObjectURL(this.imgPreview);
    }
    this.imgPreview = '';
    this.uploadedFileInfo = null;
    this.fileinpo.nativeElement.value = '';
  }
  // input post descreption file
  postDescr: FormControl = new FormControl('', [Validators.required]);

  //discare changes in modal
  discardeChange(): void {
    this.postDescr.reset();
    this.clearpreview();
    this.backCloseModal();
    this.shmodul();
    this.crPostMsg = '';
  }

  // submit form
  loading: boolean = false;
  sendPostInfo(e: SubmitEvent): void {
    e.preventDefault();
    this.loading = true;
    let formdata = new FormData();

    formdata.append('body', this.postDescr.value);
    if (this.uploadedFileInfo) {
      formdata.append('image', this.uploadedFileInfo);
    }

    if (this.postDescr.value) {
      this.postsService.createPost(formdata).subscribe({
        next: (res) => {
          this.crPostMsg = res.message;
          this.postDescr.reset();
          this.clearpreview();
          this.shmodul();
          this.loading = false;
          // this.showposts.getAllPosts();
        },
        error: (err) => {
          this.crPostMsg = err.message;
          this.loading = false;
        },
      });
    } else {
      this.crPostMsg = ' your post is empty ';
      this.loading = false;
    }
  }
}
