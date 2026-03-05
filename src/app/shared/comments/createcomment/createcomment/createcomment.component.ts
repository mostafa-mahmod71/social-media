import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentsService } from '../../../../core/auth/services/comments/comments.service';

@Component({
  selector: 'app-createcomment',
  imports: [ReactiveFormsModule],
  templateUrl: './createcomment.component.html',
  styleUrl: './createcomment.component.css',
})
export class CreatecommentComponent {
  private readonly commentsService = inject(CommentsService);
  @Input({ required: true }) PostId!: string;
  @Output() commentAdded = new EventEmitter<void>();

  ////// comments

  crcomment: FormControl = new FormControl('', [Validators.required]);
  submitloading: boolean = false;

  createComment(e: SubmitEvent | Event, id: string): void {
    e.preventDefault();
    if (this.submitloading || this.crcomment.invalid) {
      return;
    }
    this.submitloading = true;
    if (this.crcomment.value) {
      let formdata = new FormData();
      formdata.append('content', this.crcomment.value);
      this.commentsService.createComment(formdata, id).subscribe({
        next: (res) => {
          if (res.success) {
            this.crcomment.reset();
            this.commentAdded.emit();
            this.submitloading = false;
          }
        },
        error: (err) => {
          console.log(err);
          this.submitloading = false;
        },
      });
    }
  }
}
