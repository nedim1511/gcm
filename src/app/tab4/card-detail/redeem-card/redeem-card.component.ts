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
    this.amount = max ? this.item.amount : this.amount;
    this.storage.set("redeemAmount", this.amount);
    this.storage.set("redeemComment", this.comment);
    this.router.navigate(["confirm"], { relativeTo: this.route });
  }
}
