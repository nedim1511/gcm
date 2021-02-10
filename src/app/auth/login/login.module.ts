import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { LoginPageRoutingModule } from "./login-routing.module";
import { LoginPage } from "./login.page";
import { SharedModule } from "src/app/shared/shared.module";
import { LoginService } from "./login.service";
import { SafariViewController } from "@ionic-native/safari-view-controller/ngx";
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    SharedModule,
    IonicStorageModule
  ],
  declarations: [LoginPage],
  providers: [LoginService, SafariViewController]
})
export class LoginPageModule {}
