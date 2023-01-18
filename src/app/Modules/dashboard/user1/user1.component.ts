
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ChatServiceService } from 'src/app/service/chat-service.service';

@Component({
  selector: 'app-user1',
  templateUrl: './user1.component.html',
  styleUrls: ['./user1.component.scss']
})
export class User1Component implements OnInit,AfterViewInit {

  // messageArray: Array<{ user: String; message: String }> = [];
  @Input() mydetail : any
  @Input() Message : any
  @Input() userDetail : any
  @Input() room  :any
  @Output() msg = new EventEmitter<any>()
  @ViewChild('msg')

  array = []

  inputMessage:any=''
  my_Detail : any

  constructor(private chatService : ChatServiceService) { }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    console.log(this.userDetail,'raban');

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
    console.log(this.inputMessage,'ashvchvqwhcvqwjhcvhw');
    console.log(this.inputMessage?.trim() == undefined);


    if(this.inputMessage?.trim() != undefined && this.inputMessage?.trim() != '' ){
      this.chatService.socket.emit('send_message',{
        from: JSON.parse(<any>sessionStorage.getItem('user')).username,
        message : this.inputMessage,
        room_id : this.room
      })

      console.log("this.my_Detail in message func()....",this.my_Detail);

       this.msg.emit(msg.value)
       this.inputMessage = ''
    }
    // this.my_Detail = JSON.parse(<any>sessionStorage.getItem('user'))
  }


  messageReceive : any



}
