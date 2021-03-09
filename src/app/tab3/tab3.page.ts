import {Component, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner/ngx';
import {AlertController} from '@ionic/angular';
import {Tab3Service} from '../services/tab3.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {

    private unsubscribe$ = new Subject<void>();
    constructor(
        private qrScanner: QRScanner,
        private router: Router,
        private service: Tab3Service,
        private zone: NgZone,
        public alertController: AlertController
    ) {
    }

    ionViewWillEnter() {
        this.startQRScanner();
    }

    ionViewWillLeave() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    startQRScanner() {
        this.qrScanner
            .prepare()
            .then((status: QRScannerStatus) => {
                if (status.authorized) {
                    this.openScanner();
                } else if (status.denied) {
                    this.permissionDenied();
                } else {
                    this.permissionDenied();
                }
            })
            .catch((e: any) => console.log('Error is', e));
    }

    private async openScanner() {
        this.qrScanner.scan().pipe(takeUntil(this.unsubscribe$)).subscribe((text: string) => {
            // Scanned URL
            if (text.includes('http')) {
                this.service.getScannedDataByUrl(text).subscribe(
                    (res) => {
                        if (res && res.id) {
                            this.goToDetails(res.id);
                        } else {
                            this.notFound();
                        }
                    },
                    () => {
                        this.notFound();
                    }
                );
            } else {
                this.service.getScannedData(text).subscribe(
                    (res) => {
                        if (res && res.id) {
                            this.goToDetails(res.id);
                        } else {
                            alert('NO ID');
                            this.notFound();
                        }
                    },
                    () => {
                        this.notFound();
                    }
                );
            }
        });
        await this.qrScanner.show();
    }

    private async goToDetails(id: any) {
        await this.qrScanner.destroy();
        this.zone.run(() => {
            this.router.navigate(['tabs/tab4/details/' + id]);
        });
    }

    private permissionDenied() {
        alert(
            'You have denied access to this application. Please go to Settings and allow required permissions so that you can use QR Scanner.'
        );
    }

    private async notFound() {
        await this.qrScanner.destroy();
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        const alert = await this.alertController.create({
            header: 'Not Found',
            message:
                'Unfortunately, your QR code could not be found. Make sure it was issued here.',
            buttons: [
                {
                    text: 'Back',
                    cssClass: 'secondary',
                    handler: () => this.router.navigate(['/tabs/tab4']),
                },
                {
                    text: 'Scan again',
                    role: 'cancel',
                    handler: () => this.openScanner(),
                },
            ],
        });

        await alert.present();
    }
}
