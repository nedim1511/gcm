import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CardListItem } from "src/app/models/card-list-item.model";
import { Tab2Service } from "src/app/services/tab2.service";
import { Storage } from "@ionic/storage";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-redeem-card",
  templateUrl: "./redeem-card.component.html",
  styleUrls: ["./redeem-card.component.scss"],
})
export class RedeemCardComponent implements OnInit {
  item: CardListItem;
  amount: number;
  comment: string;

  constructor(
    private service: Tab2Service,
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    public alertController: AlertController
  ) {
    this.amount = 0;
    this.get();
  }

  ngOnInit() {}

  private get() {
    this.service.find(+this.route.snapshot.params.id).subscribe((res) => {
      this.item = res;
    });
  }

  redeem(max?: boolean) {
    this.amount = max ? this.item.amount : this.amount;
    if (this.amount > this.item.amount) {
      this.amount = 0;
      alert("Redeem amount cannot be higher than current amount.");
      return;
    }
    if (this.amount === 0) {
      alert("Redeem amount must be greater than 0.");
      return;
    }
    if (this.comment && this.comment.length > 1000) {
      alert("Comment length cannot exceed 1000 characters.");
      return;
    }
    this.confirmRedeem();
    // this.storage.set("redeemAmount", this.amount);
    // this.storage.set("redeemComment", this.comment);
    // this.router.navigate(["confirm"], { relativeTo: this.route });
  }

  async confirmRedeem() {
    const alert = await this.alertController.create({
      header: "Confirm",
      message:
        "Are you sure you want to proceed? The new amount will be <strong>" +
        this.item.currency +
        " " +
        (this.item.amount - this.amount) +
        "</strong>." +
        (this.comment
          ? "<br><br><strong>Comment: </strong>" + this.comment
          : ""),
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Yes",
          handler: () => {
            this.service.redeem(this.item.id, this.amount).subscribe(() => {
              this.router.navigate(["/tabs/tab4/details/" + this.item.id]);
            });
          },
        },
      ],
    });

    await alert.present();
  }
}
