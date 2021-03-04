import {Component, OnInit} from '@angular/core';
import {Tab5Service} from '../tab5.service';
import {AlertController} from '@ionic/angular';
import {UserModel} from '../models/user.model';
import {Router} from '@angular/router';

@Component({
    selector: 'app-member-list',
    templateUrl: './member-list.page.html',
    styleUrls: ['./member-list.page.scss'],
})
export class MemberListPage implements OnInit {

    users: UserModel[];

    constructor(
        private service: Tab5Service,
        private router: Router,
        private alertController: AlertController
    ) {
        this.getAllUsers();
    }

    private getAllUsers() {
        this.service.getAllUsers().subscribe((res) => {
            this.users = res;
        }, (error) => {
            console.log(error);
        });
    }

    ngOnInit() {}

    goToUser(id: string) {
        this.router.navigate(['/tabs/tab5/member-list/user-account/' + id]);
    }

    async delete(id: string) {
        const alert = await this.alertController.create({
            header: 'Confirm',
            message: 'Are you sure you want to delete this user?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    },
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.service.deleteUser(id).subscribe(() => {
                            this.getAllUsers();
                        }, (error => {
                            this.showError();
                            console.log(error);
                        }));
                    },
                },
            ],
        });

        await alert.present();
    }

    private showError() {
        alert('Sorry, an error occurred while deleting the user.');
    }

}
