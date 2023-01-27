import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FieldErrorComponent } from "./field-error.component";

@NgModule({
  declarations: [
    FieldErrorComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  exports:[
    FieldErrorComponent,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ]
})
export class FieldErrorModule { }
