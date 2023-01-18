import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReadMoreComponent } from "./read-more.component";

@NgModule({
  declarations: [
    ReadMoreComponent
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    ReadMoreComponent
  ]
})
export class ReadMoreModule { }
