import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CardListItem } from "src/app/models/card-list-item.model";
import { Tab2Service } from "src/app/services/tab2.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-confirm-top-up",
  templateUrl: "./confirm-top-up.component.html",
  styleUrls: ["./confirm-top-up.component.scss"],
})
export class ConfirmTopUpComponent implements OnInit {
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
    this.storage.get("topUpAmount").then((val) => {
      this.amount = val;
    });
    this.storage.get("topUpComment").then((val) => {
      this.comment = val;
    });
  }

  private get() {
    this.service.find(+this.route.snapshot.params.id).subscribe((res) => {
      this.item = res;
    });
  }

  confirm() {
    this.service.topUp(this.item.id, this.amount).subscribe((res) => {
      this.router.navigate(["/tabs/tab4/details/" + this.item.id]).then(() => {
        // Clear storage
        this.storage.remove("topUpAmount");
        this.storage.remove("topUpComment");
        alert("Successful top up");
      });
    });
  }
}
