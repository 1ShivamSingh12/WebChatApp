import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { User1Component } from './user1.component';

const routes: Routes = [
  {path:"",component:User1Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class User1RoutingModule { }
