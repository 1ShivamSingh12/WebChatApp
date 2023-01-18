import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowErrorModule } from 'src/app/pipe/show-error.module';
import { FieldErrorModule } from 'src/app/shared/field-error/field-error.module';




@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatFormFieldModule,
MatInputModule,
FormsModule,
ReactiveFormsModule,
ShowErrorModule,
FieldErrorModule


  ]
})
export class LoginModule { }
