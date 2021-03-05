import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  password: string;
  confirm: string;
  old: string;

  constructor() { }

  save() {
    if (this.isValid()) {
      alert('Success. Now goes backend call');
    }
  }

  ngOnInit() {
  }

  private isValid() {
    if (!this.old) {
      alert('Old password is required.');
      return false;
    }
    if (!this.password) {
      alert('New password is required.');
      return false;
    }
    if (!this.confirm) {
      alert('Confirm password is required.');
      return false;
    }
    if (this.confirm !== this.password) {
      alert('New passwords are not the same.');
      return false;
    }
    if (this.password === this.old) {
      alert('Please use a different password than your current one.');
      return false;
    }
    return true;
  }

}
