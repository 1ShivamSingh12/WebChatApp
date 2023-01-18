import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './gurads/auth.guard';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', redirectTo: 'account', pathMatch: 'full' },

  {

    path: 'account',
    loadChildren: () =>
      import('./Modules/account/account.module').then((m) => m.AccountModule),
  },
  {

    path: 'dashboard',
    canActivate:[AuthGuard],
    loadChildren: () =>
      import('./Modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {path:'**' , component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
