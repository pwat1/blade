import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit, OnDestroy {
  @Input() username : String;
  messages = [];
  message;
  connection;
  userlist = [];
  gamelist = [];
  private inGame = false;
  currentGame : String;

  constructor(private chatService:ChatService) {}

  sendMessage(){
    if(!this.message) //nonempty
      return
    //need to update self as well
    this.messages.push({
      username: this.username,
      color: this.chatService.getUsernameColor(this.username),
      message: this.message
    });
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit() { 
    this.connection = this.chatService.createSocket(this.username).subscribe(message => {
      this.messages.push(message);
    })
    this.chatService.getUsers().subscribe(data => {
      this.userlist = data
    })
    this.chatService.getGames().subscribe(data => {
      this.gamelist = data
    })
    
  }
  
  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  createGame() {
    if(this.inGame)
      return
    this.currentGame = this.chatService.createGame(this.username)
    this.inGame = true;
  }

  quitGame() {
    if(!this.inGame)
      return
    this.chatService.killGame(this.currentGame)
    this.currentGame = ''
    this.inGame = false
  }

  joinGame(owner) {
    if(this.inGame)
      return
    this.chatService.joinGame(owner)
    this.currentGame = owner
    this.inGame = true
  }
}