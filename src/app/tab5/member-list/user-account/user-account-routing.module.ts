import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAccountPage } from './user-account.page';

const routes: Routes = [
  {
    path: '',
    component: UserAccountPage
  },
  {
    path: ':id',
    component: UserAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAccountPageRoutingModule {}
