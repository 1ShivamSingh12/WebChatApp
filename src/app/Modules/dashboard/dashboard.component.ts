import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CHAT_USERS_DATA } from 'src/app/constant/user_detail';
import { ChatServiceService } from 'src/app/service/chat-service.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,AfterViewInit {

  name:any
  messageArray: Array<{ message: String }> = [];
  groupDisplay = false
  user_list = CHAT_USERS_DATA
  room:any
  totalusers : any = []
  msgArr :any = []
  loggedIn : any
  constructor(public dialog: MatDialog , private chatservice : ChatServiceService , private snackbarService : SnackbarService) {
    this.chatservice.getOnlineUser().subscribe((data: any) => {
      data = data.filter((data:any)=>data.user_id  !== this.loggedIn.user_id )
      console.log(data,'obseronline');
      this.user = data
      this.display = false
    });

    this.chatservice.newUserJoined().subscribe((data: any) => {
      this.messageArray.push(data);
    });

    this.chatservice.sendMessage().subscribe((data: any) => {
      console.log(data,"ui")
      this.messageArray.push(data)
      console.log(this.messageArray,'ui');

    });

  }
  ngOnInit(): void {
    this.loggedIn = JSON.parse(<any>sessionStorage.getItem('user'))
    this.chatservice.socket.emit('loggedIn' ,{...this.loggedIn , type:'private'})
    this.chatservice.socket.on('UsersLogged', (data:any)=>{
      console.log(data);

      data = data.filter((item:any)=>
        item.username != JSON.parse(<any>sessionStorage.getItem('user')).username
      )

      this.user =  data
      // localStorage.removeItem(this.loggedIn.username)


    })
    this.chatservice.socket.on('update_session_storage', async (data: any) => {

      console.log(data);

      if (localStorage.getItem(data.room_id) === null) {
        localStorage.setItem(data.room_id, JSON.stringify([]));
      }
      this.msgArr = await JSON.parse(<any>localStorage.getItem(data.room_id));
      this.msgArr.push({ from: data.from, message: data.message , });
      localStorage.setItem(data.room_id, JSON.stringify(this.msgArr));
      this.chatData = JSON.parse(<any>localStorage.getItem(this.currentRoom));
    });

    this.chatservice.socket.on('room_id', (room_id: any) => {
      if (localStorage.getItem(room_id) === null) {
        localStorage.setItem(room_id, JSON.stringify([]));
      }
      this.chatData = JSON.parse(<any>localStorage.getItem(room_id));
      this.currentRoom = room_id;
    });

  }


  ngAfterViewInit(): void {

  }

  selectedUser : any


  newGroup : any
  dataSelected:any = {};
  display = false

  user : any[] = [];

  currentRoom:any
  last_id:any
  chatData:any

  userdata:any
  show(data:any){
    console.log(data,'jhjjj');
    this.display = true
    this.selectedUser = data
    if(data.socket_id){
      console.log(data);
      this.chatservice.chat(data)
      this.chatservice.socket.on('room_id', (room_id: any) => {
        if (localStorage.getItem(room_id) === null) {
          localStorage.setItem(room_id, JSON.stringify([]));
        }
        this.chatData = JSON.parse(<any>localStorage.getItem(room_id));
        this.currentRoom = room_id;
      });
    } else {
      console.log(data);
    }
  }

  groupDetail(){
    if(this.groupDisplay == false){
      this.groupDisplay = true
    }else if(this.groupDisplay == true){
      this.groupDisplay = false
    }
  }
  groupName:any

  joinRoom(){



    let group_Data = {
      username : this.room,
      user_id : this.name,
      type:'group',
    }


    console.log(this.chatservice.details.username);
    console.log(this.name);

    if(this.chatservice.details.username == this.name && this.room.trim() != ''){
      this.chatservice.socket.emit('loggedIn',group_Data)
    }else if(this.chatservice.details.username != this.name){
      this.snackbarService.openSnackBarErr('Name should be same as username' , 'red-snackbar')
    }else if(this.room.trim() == ''){
      this.snackbarService.openSnackBarErr('Group Name cannot be empty' , 'red-snackbar')
    }
  }
}
