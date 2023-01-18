import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/gurads/auth.guard';
import { AccountComponent } from './account.component';

const routes: Routes = [
  {path:'',component:AccountComponent,children:[
    {path:'',redirectTo:'login',pathMatch:'full'},
    {
      path: 'login',
    // canActivate:[AuthGuard],
      loadChildren: () =>
        import('./login/login.module').then((m) => m.LoginModule),
    },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
