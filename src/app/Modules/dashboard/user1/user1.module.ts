import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { User1RoutingModule } from './user1-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ReadMoreModule } from 'src/app/shared/read-more/read-more.module';
@NgModule({
  declarations: [
    // User1Component
  ],
  imports: [
    CommonModule,
    User1RoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReadMoreModule
  ],
})
export class User1Module {}
