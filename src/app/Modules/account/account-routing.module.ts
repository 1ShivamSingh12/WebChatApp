import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LOGIN } from 'src/app/constant/routes';
import { AccountComponent } from './account.component';

const routes: Routes = [
  {path:'',component:AccountComponent,children:[
    {path:'',redirectTo:LOGIN.path,pathMatch:'full'},
    {
      path: LOGIN.path,
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
