import { Component, inject, input, OnInit } from '@angular/core';
import { Userinfo } from '../../userinfo.interface';
import { ProfilepostsComponent } from './profileposts/profileposts/profileposts.component';
import { CreatePostComponent } from '../../shared/post/create-post/create-post.component';
import { ProfileService } from '../../core/auth/services/profile/profile.service';
import { Iprofile } from '../../core/models/iprofiledata/iprofile.interface';

@Component({
  selector: 'app-profile',
  imports: [ProfilepostsComponent, CreatePostComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private readonly profileService = inject(ProfileService);
  Userinfo: Userinfo = JSON.parse(localStorage.getItem('socialUser') || '{}');
  userData: any;
  ngOnInit(): void {
    this.getAllData();
  }
  profileData?: Iprofile;

  getAllData() {
    this.profileService.getprofiledata().subscribe({
      next: (res) => {
        this.profileData = res.data.user;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  uploadingphoto: File | null = null;
  errUpload: string = '';
  upProfilePhoto(e: Event) {
    let input = e.target as HTMLInputElement;
    if (input.files) {
      this.uploadingphoto = input.files[0];
    }
    let formdata = new FormData();
    if (this.uploadingphoto) {
      formdata.append('photo', this.uploadingphoto);
      this.profileService.uploadprofilephoto(formdata).subscribe({
        next: (res) => {
          if (res.success) {
            this.getAllData();
            this.errUpload = '';
            console.log(res);
            this.Userinfo.photo = res.data.photo;
            localStorage.setItem('socialUser', JSON.stringify(this.Userinfo));
            window.location.reload();
          }
        },
        error: (err) => {
          console.log(err);
          this.errUpload = err.error.message;
        },
      });
    }
  }
}
