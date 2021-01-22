import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CardListItem } from "src/app/models/card-list-item.model";
import { Tab2Service } from "src/app/services/tab2.service";
import { Storage } from "@ionic/storage";

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
    private storage: Storage
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
    this.storage.set("redeemAmount", this.amount);
    this.storage.set("redeemComment", this.comment);
    this.router.navigate(["confirm"], { relativeTo: this.route });
  }
}
