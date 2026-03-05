import { Component, inject, OnInit } from '@angular/core';
import { FowllowsuggestsService } from '../../../../core/auth/services/fowllowsugg/fowllowsuggests.service';
import { Ifollowers } from '../../../../core/models/ifollowers.interface';

@Component({
  selector: 'app-followsugg',
  imports: [],
  templateUrl: './followsugg.component.html',
  styleUrl: './followsugg.component.css',
})
export class FollowsuggComponent implements OnInit {
  private readonly fowllowsuggService = inject(FowllowsuggestsService);

  ngOnInit(): void {
    this.getfollowSugg();
  }
  suggestedFollows: Ifollowers[] = [];
  getfollowSugg() {
    this.fowllowsuggService.followSugg().subscribe({
      next: (res) => {
        if (res.success) {
          this.suggestedFollows = res.data.suggestions;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
