import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CardDetailComponent } from "./card-detail/card-detail.component";
import { RedeemCardComponent } from "./card-detail/redeem-card/redeem-card.component";
import { RedeemConfirmComponent } from "./card-detail/redeem-card/redeem-confirm/redeem-confirm.component";
import { TopUpCardComponent } from "./card-detail/top-up-card/top-up-card.component";

import { Tab4Page } from "./tab4.page";

const routes: Routes = [
  {
    path: "",
    component: Tab4Page,
  },
  {
    path: "details/:id",
    component: CardDetailComponent,
  },
  {
    path: "details/:id/redeem",
    component: RedeemCardComponent,
  },
  {
    path: "details/:id/redeem/confirm",
    component: RedeemConfirmComponent,
  },
  {
    path: "details/:id/top-up",
    component: TopUpCardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab4PageRoutingModule {}
