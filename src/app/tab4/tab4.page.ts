import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CardListItem } from "../models/card-list-item.model";
import { Tab2Service } from "../services/tab2.service";

@Component({
  selector: "app-tab4",
  templateUrl: "./tab4.page.html",
  styleUrls: ["./tab4.page.scss"],
})
export class Tab4Page {
  segment = "all";
  list: CardListItem[];
  filteredList: CardListItem[];
  searchText: string;

  constructor(
    private service: Tab2Service,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getList();
  }

  private getList() {
    this.service.get().subscribe((res) => {
      this.list = res;
      this.segmentChanged();
    });
  }

  segmentChanged(name: string = this.segment) {
    switch (name) {
      case "all":
        this.filteredList = this.list;
        break;
      case "active":
        this.filteredList = this.list.filter((item) => item.amount > 0);
        break;
      default:
        this.filteredList = this.list.filter((item) => item.amount < 0);
        break;
    }
  }

  goToDetail(id: number) {
    this.router.navigate(["details"], { relativeTo: this.route });
  }
}
