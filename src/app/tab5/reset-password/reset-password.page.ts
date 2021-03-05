import { Component, OnInit } from '@angular/core';
import {UserModel} from '../models/user.model';
import {Tab5Service} from '../tab5.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  user: UserModel;
  password: string;
  confirm: string;

  constructor(
      private service: Tab5Service,
      private router: Router,
      private route: ActivatedRoute
  ) {
    this.loadUser();
  }

  private loadUser() {
    const id = this.route.snapshot.params.id;
    this.service.getUser(id).subscribe((res) => {
      this.user = res;
    });
  }

  save() {
    if (this.isValid()) {
      this.service.resetPassword(this.user.id, this.password).subscribe(() => {
        this.router.navigate(['/tabs/tab5/member-list/user-account/' + this.user.id]);
      });
    }
  }

  ngOnInit() {
  }

  private isValid() {
    if (!this.password) {
      alert('Password is required.');
      return false;
    }
    if (!this.confirm) {
      alert('Confirm password is required.');
      return false;
    }
    if (this.confirm !== this.password) {
      alert('Passwords are not the same.');
      return false;
    }
    return true;
  }

}
