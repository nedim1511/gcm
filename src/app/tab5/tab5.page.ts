import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page {

  constructor(
      private router: Router,
      private route: ActivatedRoute
  ) { }

  goToMyAccount() {
    this.router.navigate(['my-account'], {relativeTo: this.route});
  }

  goToChangePassword() {
    this.router.navigate(['change-password'], {relativeTo: this.route});
  }

  goToMemberList() {
    this.router.navigate(['member-list'], {relativeTo: this.route});
  }

}
