import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { Tab4PageRoutingModule } from "./tab4-routing.module";

import { Tab4Page } from "./tab4.page";
import { GiftCardFilterPipe } from "../pipes/gift-card-filter.pipe";
import { CardDetailComponent } from "./card-detail/card-detail.component";
import { RedeemCardComponent } from "./card-detail/redeem-card/redeem-card.component";
import { TopUpCardComponent } from "./card-detail/top-up-card/top-up-card.component";
import { RedeemConfirmComponent } from "./card-detail/redeem-card/redeem-confirm/redeem-confirm.component";
import { ConfirmTopUpComponent } from "./card-detail/top-up-card/confirm-top-up/confirm-top-up.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, Tab4PageRoutingModule],
  declarations: [
    Tab4Page,
    GiftCardFilterPipe,
    CardDetailComponent,
    RedeemCardComponent,
    TopUpCardComponent,
    RedeemConfirmComponent,
    ConfirmTopUpComponent,
  ],
})
export class Tab4PageModule {}
