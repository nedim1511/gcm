import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.page.html',
    styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {

    countryCode: string;

    constructor(
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    save(data: any) {
        const values = data.form.value;
        console.log(values);
        if (this.clientValidation(values)) {
            this.router.navigate(['/tabs/tab5']);
        }
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
        if (!data.name) {
            alert('Organization name is required');
            return false;
        }
        if (!data.address) {
            alert('Address is required');
            return false;
        }
        if (!data.zip) {
            alert('ZIP code is required');
            return false;
        }
        if (!data.city) {
            alert('City is required');
            return false;
        }
        if (!this.countryCode) {
            alert('Country is required');
            return false;
        }
        if (!data.phone) {
            alert('Phone is required');
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

    goToChangePassword() {
        this.router.navigate(['tabs/tab5/change-password']);
    }

}
