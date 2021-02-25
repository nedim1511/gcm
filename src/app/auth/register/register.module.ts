import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterService } from './register.service';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    SharedModule
  ],
  declarations: [RegisterPage, ConfirmEmailComponent],
  providers: [RegisterService]
})
export class RegisterPageModule {}
