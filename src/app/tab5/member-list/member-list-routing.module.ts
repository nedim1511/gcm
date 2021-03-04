import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberListPage } from './member-list.page';

const routes: Routes = [
  {
    path: '',
    component: MemberListPage
  },
  {
    path: 'user-account',
    loadChildren: () => import('./user-account/user-account.module').then( m => m.UserAccountPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberListPageRoutingModule {}
