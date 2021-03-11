import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Tab2Service } from '../services/tab2.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  segment = '10';
  amount: number;
  comment: string;

  constructor(
    public alertController: AlertController,
    private service: Tab2Service,
    private router: Router,
    private socialSharing: SocialSharing
  ) {
    this.numberChanged();
  }

  numberChanged(name: string = this.segment) {
    this.amount = +name;
  }

  issueCard() {
    if (this.amount <= 0) {
      alert('The amount has to be larger than 0');
      return;
    }
    if (this.comment && this.comment.length > 1000) {
      alert('Comment cannot have more than 1000 characters');
    }
    this.confirmIssue();
  }

  async confirmIssue() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message:
        'Are you sure you want to issue a new gift card? The amount will be <strong>' +
        this.amount +
        '</strong>.' +
        (this.comment
          ? '<br><br><strong>Comment: </strong>' + this.comment
          : ''),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Confirm and Share',
          handler: () => this.createCard(),
        },
      ],
    });

    await alert.present();
  }

  private createCard() {
    this.service.issue(this.amount).subscribe((res) => {
      this.openShare();
    });
  }

  private openShare() {
    this.socialSharing
      .share(
        null,
        null,
        'https://polycommerce.ba/demo_share_image.png'
      )
      .then(() => {
        this.goToAllCards();
      })
      .catch((error) => {
        console.log(error);
        this.goToAllCards();
      });
  }

  private goToAllCards() {
    this.router.navigate(['/tabs/tab4']);
  }
}
