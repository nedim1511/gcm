import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CardListItem } from "src/app/models/card-list-item.model";
import { Tab2Service } from "src/app/services/tab2.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-top-up-card",
  templateUrl: "./top-up-card.component.html",
  styleUrls: ["./top-up-card.component.scss"],
})
export class TopUpCardComponent implements OnInit {
  item: CardListItem;
  amount: number;
  comment: string;
  segment: string = "tu";

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

  topUp() {
    this.amount =
      this.segment === "tu" ? (this.item.amount += this.amount) : this.amount;
    this.storage.set("topUpAmount", this.amount);
    this.storage.set("topUpComment", this.comment);
    this.router.navigate(["confirm"], { relativeTo: this.route });
  }
}
