
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ChatServiceService } from 'src/app/service/chat-service.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';

@Component({
  selector: 'app-user1',
  templateUrl: './user1.component.html',
  styleUrls: ['./user1.component.scss']
})
export class User1Component implements OnInit,AfterViewInit {

  @Input() mydetail : any
  @Input() Message : any
  @Input() userDetail : any
  @Input() room  :any
  @Output() msg = new EventEmitter<any>()
  @Output() flag = new EventEmitter<any>()
  @Output() leave_flag = new EventEmitter<any>()
  @ViewChild('msg')

  array = []

  inputMessage:any = ''
  my_Detail : any
  messageReceive : any

  constructor(private chatService : ChatServiceService , private snackbar : SnackbarService) { }
  ngAfterViewInit(): void {

  }

  group_left : any

  ngOnInit(): void {
    this.chatService.sendMessage().subscribe((data)=>{
      console.log("data comes from server....",data);
      this.messageReceive.push(data)
    })
    this.my_Detail = JSON.parse(<any>sessionStorage.getItem('user'))
    console.log("this.my_Detail....",this.my_Detail);

    this.chatService.socket.on('UsersLogged', (data:any)=>{
      console.log(data);

      data = data.filter((item:any)=>
        item.username != JSON.parse(<any>sessionStorage.getItem('user')).username
      )
      this.array =  data

    })


  }
  message(msg:any){
    this.inputMessage = this.inputMessage?.trim()
    if(this.inputMessage?.trim() != undefined && this.inputMessage?.trim() != ''){
      this.inputMessage = this.inputMessage.substring(0 , 2000)
      this.chatService.socket.emit('send_message',{
        from: JSON.parse(<any>sessionStorage.getItem('user')).username,
        message : this.inputMessage,
        room_id : this.room
      })
      console.log("this.my_Detail in message func()....",this.my_Detail);
       this.msg.emit(msg.value)
       this.inputMessage = ''
    }else if(this.inputMessage == ''){
      this.snackbar.openSnackBarErr('Please enter message','red-snackbar')
    }else if(this.inputMessage.length >= 2000){
      this.snackbar.openSnackBarErr('Enter message length should be less' , 'red-snackbar')
    }
    // this.my_Detail = JSON.parse(<any>sessionStorage.getItem('user'))
  }

  leave(){
    console.log(this.userDetail);
    console.log(sessionStorage.getItem('user'));
    // console.log(this.group_left,'jjjj');

    this.leave_flag.emit('True')

    // this.chatService.leaveGroup({user:JSON.parse(<any>sessionStorage.getItem('user')).username , room:this.userDetail.username})
  }

  toggle(){
    this.flag.emit('')
  }
}
