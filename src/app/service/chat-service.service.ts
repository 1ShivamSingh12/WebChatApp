import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  details : any = {
    username : '',
    password : '',
    userId :''
  }

  friends:any[] = []

  socket : any
  userID:any

  constructor() { }

  connection(){
    this.socket = io(environment.SOCKET_ENDPOINT)
  }


  getID(){
    return this.userID
  }

  onlineUser(data:any){
    this.socket.emit('online',data)
  }

  exist_group(){
    let observable = new Observable<{}>(observer => {
      this.socket.on('group_exist', (data:any) => {
        console.log(data,'exist');
        observer.next(data);

      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }



  getOnlineUser(){
    let observable = new Observable<{user:string , user_id: String , socket_id : string}>(observer => {
      this.socket.on('OnlineUsers', (data:any,data1:any) => {
        console.log(data1,'loggedout');

        localStorage.removeItem(data1[0].username)
        observer.next(data);

      });
      return () => { this.socket.disconnect(); }
    });

    return observable;

  }


  message(data: any) {
    console.log(data,'message etail');

    this.socket.emit('message', data)
  }

  sendMessage() {
    let observable = new Observable<{user:string , message: String}>(observer => {
      this.socket.on('new message', (data:any) => {
        console.log(data,'sendmessage');
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }

  joinGroup(data:any){
    console.log(data);

    this.socket.emit('join' ,data)
  }



  newUserJoined()
  {
      let observable = new Observable<{user:String, message:String , userID  :String}>(observer=>{
          this.socket.on('new user joined', (data:any)=>{
            console.log(data);

              observer.next(data);
          });
          return () => {this.socket.disconnect();}
      });

      return observable;
  }

  chat(data:any){
    let my_detail = JSON.parse(<any>sessionStorage.getItem('user'))
    console.log(data,'sercice');

    this.socket.emit('chat',data , my_detail)
  }

  leaveGroup(data:any){
    console.log(data,'ervj');
    this.socket.emit('leave',data)

  }

  userLeft()
  {
      let observable = new Observable<{user:String, message:String}>(observer=>{
          this.socket.on('User_left', (data:any)=>{
            console.log(data , 'userleft');

            observer.next(data);
          });
          return () => {this.socket.disconnect();}
      });

      return observable;
  }

}
