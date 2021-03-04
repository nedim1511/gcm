import { AfterViewInit, Component } from "@angular/core";
import { Router } from "@angular/router";
import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner/ngx";
import { AlertController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { Tab3Service } from "../services/tab3.service";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page {
  scanSubscription: Subscription;
  constructor(
    private qrScanner: QRScanner,
    private router: Router,
    private service: Tab3Service,
    public alertController: AlertController
  ) {}

  ionViewWillEnter() {
    this.startQRScanner();
  }

  ionViewDidLeave() {
    if (this.scanSubscription) {
      this.scanSubscription.unsubscribe();
    }
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
      .catch((e: any) => console.log("Error is", e));
  }

  private openScanner() {
    this.scanSubscription = this.qrScanner.scan().subscribe((text: string) => {
      this.scanSubscription.unsubscribe();
      // Scanned URL
      if (text.includes("http")) {
        this.service.getScannedDataByUrl(text).subscribe(
          (res) => {
            if (res && res.id) {
              this.router.navigate(["tabs/tab4/details/" + res.id]);
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
              this.router.navigate(["tabs/tab4/details/" + res.id]);
            } else {
              alert("Nema ID");
              this.notFound();
            }
          },
          (error) => {
            alert(JSON.stringify(error));
            this.notFound();
          }
        );
      }
    });

    this.qrScanner.show().then(() => {});
  }

  private permissionDenied() {
    alert(
      "You have denied access to this application. Please go to Settings and allow required permissions so that you can use QR Scanner."
    );
  }

  private async notFound() {
    const alert = await this.alertController.create({
      header: "Not Found",
      message:
        "Unfortunately, your QR code could not be found. Make sure it was issued here.",
      buttons: [
        {
          text: "Back",
          cssClass: "secondary",
          handler: () => this.router.navigate(["/tabs/tab4"]),
        },
        {
          text: "Scan again",
          role: "cancel",
          handler: () => this.openScanner(),
        },
      ],
    });

    await alert.present();
  }
}
