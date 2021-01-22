import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CardListItem } from "src/app/models/card-list-item.model";
import { Tab2Service } from "src/app/services/tab2.service";

@Component({
  selector: "app-card-detail",
  templateUrl: "./card-detail.component.html",
  styleUrls: ["./card-detail.component.scss"],
})
export class CardDetailComponent implements OnInit {
  item: CardListItem;

  constructor(private service: Tab2Service, private route: ActivatedRoute) {
    this.get();
  }

  ngOnInit() {}

  private get() {
    this.service.find(+this.route.snapshot.params.id).subscribe((res) => {
      this.item = res;
    });
  }
}
