import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ChatServiceService } from 'src/app/service/chat-service.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss']
})
export class GroupDialogComponent implements OnInit {

  groupName:any
  constructor(private chatservice : ChatServiceService , private snackbarService : SnackbarService , public dialogRef: MatDialogRef<GroupDialogComponent>) { }

  ngOnInit(): void {
  }


  submit(){
    this.groupName = this.groupName.trim()
    let group_Data = {
      username : this.groupName,
      type:'group',
    }
    if(this.groupName.trim() != ''){
      this.chatservice.socket.emit('loggedIn',group_Data)
      this.groupName = ''
      this.dialogRef.close();
    }else if(this.groupName.trim() == ''){
      this.snackbarService.openSnackBarErr('Group Name cannot be empty' , 'red-snackbar')
    }
  }

  close(){
    this.dialogRef.close()
  }
}
