import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAccountPageRoutingModule } from './user-account-routing.module';

import { UserAccountPage } from './user-account.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UserAccountPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [UserAccountPage]
})
export class UserAccountPageModule {}
