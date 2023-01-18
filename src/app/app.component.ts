import { Component } from '@angular/core';
import { ChatServiceService } from './service/chat-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'asd';

  constructor(private chatService : ChatServiceService){
    // this.chatService.connection()
  }
}
