import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner/ngx";
import { AlertController } from "@ionic/angular";
import { Tab3Service } from "../services/tab3.service";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page {
  constructor(
    private qrScanner: QRScanner,
    private router: Router,
    private service: Tab3Service,
    public alertController: AlertController
  ) {
    this.startQRScanner();
  }

  startQRScanner() {
    this.qrScanner
      .prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            this.qrScanner.hide();
            scanSub.unsubscribe();

            // Scanned URL
            if (text.includes("api/gcm")) {
              this.service.getScannedDataByUrl(text).subscribe(
                (res) => {
                  if (res && res.id) {
                    this.router.navigate(["tabs/tab4/details/" + res.id]);
                  } else {
                    this.notFound();
                  }
                },
                (error) => {
                  this.notFound();
                }
              );
            }

            // Scanned Code
            this.service.getScannedData(text).subscribe(
              (res) => {
                if (res && res.id) {
                  this.router.navigate(["tabs/tab4/details/" + res.id]);
                } else {
                  this.notFound();
                }
              },
              (error) => {
                this.notFound();
              }
            );
          });
        } else if (status.denied) {
          this.permissionDenied();
        } else {
          this.permissionDenied();
        }
      })
      .catch((e: any) => console.log("Error is", e));
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
          handler: () => {},
        },
      ],
    });

    await alert.present();
  }
}
