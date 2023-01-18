import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ShowErrorPipe } from "./show-error.pipe";


@NgModule({
  declarations: [ShowErrorPipe],
  imports: [
    CommonModule
  ],
  exports :[ShowErrorPipe]
})
export class ShowErrorModule { }
