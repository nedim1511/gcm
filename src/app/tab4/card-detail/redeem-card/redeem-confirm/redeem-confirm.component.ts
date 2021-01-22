import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { CardListItem } from "src/app/models/card-list-item.model";
import { Tab2Service } from "src/app/services/tab2.service";

@Component({
  selector: "app-redeem-confirm",
  templateUrl: "./redeem-confirm.component.html",
  styleUrls: ["./redeem-confirm.component.scss"],
})
export class RedeemConfirmComponent implements OnInit {
  amount: number;
  comment: string;
  item: CardListItem;

  constructor(
    private service: Tab2Service,
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage
  ) {
    this.get();
  }

  ngOnInit() {
    this.loadRedeemData();
  }

  private loadRedeemData() {
    this.storage.get("redeemAmount").then((val) => {
      this.amount = val;
    });
    this.storage.get("redeemComment").then((val) => {
      this.comment = val;
    });
  }

  private get() {
    this.service.find(+this.route.snapshot.params.id).subscribe((res) => {
      this.item = res;
    });
  }

  confirm() {
    this.service.redeem(this.item.id, this.amount).subscribe((res) => {
      this.router.navigate(["/tabs/tab4/details/" + this.item.id]).then(() => {
        // Clear storage
        this.storage.remove("redeemAmount");
        this.storage.remove("redeemComment");
        alert("Successfully redeemed " + this.amount);
      });
    });
  }
}
