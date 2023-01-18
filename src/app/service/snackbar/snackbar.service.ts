import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar : MatSnackBar) { }


  openSnackBarErr(message: any, theme: string) {
    this.snackbar.open(message, '', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: [theme],
      horizontalPosition: 'center'
    })
  }
}
