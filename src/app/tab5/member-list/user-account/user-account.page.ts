import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../models/user.model';
import {ActivatedRoute} from '@angular/router';
import {Tab5Service} from '../../tab5.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.page.html',
  styleUrls: ['./user-account.page.scss'],
})
export class UserAccountPage implements OnInit {

  account: UserModel;
  form: FormGroup;

  constructor(
      private route: ActivatedRoute,
      private service: Tab5Service,
      private fb: FormBuilder,
      public alertController: AlertController
  ) {
    this.form = this.fb.group({
      firstName: this.account ? this.account.first_name : null,
      lastName: this.account ? this.account.last_name : null,
      email: this.account ? this.account.email : null,
      password: null,
      confirm: null
    });
    this.loadUser();
  }

  ngOnInit() {
  }

  private loadUser() {
    const id = this.route.snapshot.params.id;
    if (!id) { return; }
    this.service.getUser(id).subscribe((res) => {
      this.account = res;
      this.updateForm(res);
    });
  }

  private updateForm(res: any) {
    this.form.patchValue({
      firstName: res.first_name,
      lastName: res.last_name,
      email: res.email
    });
  }

  submit() {
    const value = this.form.value;
    if (this.clientValidation(value)) {
      const data = this.form.value;
      if (this.account && this.account.id) {
        // Edit account
        this.account = new UserModel(this.account.id, data.email, data.firstName, data.lastName);
        this.service.update(this.account).subscribe((res) => {
          this.showSuccess();
        }, (error) => {
          alert('An error occurred.');
          console.log(error);
        });
      } else {
        // Create account
        this.account = new UserModel(null, data.email, data.first_name, data.last_name);
        this.service.create(this.account).subscribe((res) => {
          this.account = res;
          this.updateForm(res);
          this.showSuccess();
        }, (error) => {
          alert('An error occurred.');
          console.log(error);
        });
      }
    }
  }

  async showSuccess() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Your data was saved.',
      buttons: ['OK']
    });

    await alert.present();
  }

  private clientValidation(data: any): boolean {
    if (!data.firstName) {
      alert('First name is required');
      return false;
    }
    if (!data.lastName) {
      alert('Last name is required');
      return false;
    }
    if (!data.email) {
      alert('Email is required');
      return false;
    }
    if (!this.isEmailValid(data.email)) {
      alert('Email is not valid.');
      return false;
    }
    if (this.account && this.account.id) {
      return true;
    }
    if (!data.password) {
      alert('Password is required.');
      return false;
    }
    if (!data.confirm) {
      alert('Confirm password is required.');
      return false;
    }
    if (data.confirm !== data.password) {
      alert('Passwords are not the same.');
      return false;
    }
    return true;
  }

  private isEmailValid(value: string): boolean {
    const atLocation = value.lastIndexOf('@');
    const dotLocation = value.lastIndexOf('.');
    return (
        atLocation > 0 &&
        dotLocation > atLocation + 1 &&
        dotLocation < value.length - 1
    );
  }

}
