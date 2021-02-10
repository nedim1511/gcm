import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { HeaderComponent } from "../layout/header/header.component";

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent] ,
  imports: [IonicModule]
})
export class SharedModule {}
