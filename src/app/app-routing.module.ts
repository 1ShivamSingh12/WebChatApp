import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ACCOUNT, DASHBOARD } from './constant/routes';
import { AuthGuard } from './gurads/auth.guard';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', redirectTo: ACCOUNT.path, pathMatch: 'full' },

  {

    path: ACCOUNT.path,
    loadChildren: () =>
      import('./Modules/account/account.module').then((m) => m.AccountModule),
  },
  {

    path: DASHBOARD.path,
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
