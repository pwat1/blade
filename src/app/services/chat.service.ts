
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {Message} from '../models/message.model'
import {Game} from '../models/game.model'

var COLORS = [
'#e21400', '#91580f', '#f8a700', '#f78b00',
'#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
'#3b88eb', '#3824aa', '#a700ff', '#d300e7'
];

@Injectable()
export class ChatService {
  private socket;
  private username: String;
  private userlist: String[];
  
  constructor () {
  }

  getUsers() {
    let observable = new Observable<String[]>(observer => {
      this.socket.on('userlist', (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }    

  getGames() {
    let observable = new Observable<Game[]>(observer => {
      this.socket.on('gamelist', (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }    

  getMessages() {
    let observable = new Observable<Message>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }  

  setUsername (username) {
    this.username = username.trim();
    if (username) {
      this.socket.emit('add user', username); 
    }
  }

  createSocket(username) {
    this.socket = io();
    this.setUsername(username)
    return this.getMessages()
  }

  // Sends a chat message
  sendMessage (message) {
    if (message) {
      this.socket.emit('new message', {
        username: this.username,
        color: this.getUsernameColor(this.username),
        message: message
      });
    }
  }

  // Gets the color of a username through our hash function
  getUsernameColor (username) {
    // Compute hash code
    var hash = 7;
    for (var i = 0; i < username.length; i++) {
     hash = username.charCodeAt(i) + (hash << 5) - hash;
   }
    // Calculate color
    var index = Math.abs(hash % COLORS.length);
    return COLORS[index];
  }

  addParticipantsMessage (data) {
    var message = '';
    if (data.numUsers === 1) {
      message += "Crickets...It's Just YOU and ME -Robot";
    } else {
      message += "there are " + data.numUsers + " players in the Lobby";
    }
  }

  createGame(username) : String {
    this.socket.emit('new game', username)
    return username
  }

  killGame(name) {
    this.socket.emit('destroy game', name)
  }

  joinGame(owner) {
    this.socket.emit('join game', {
      gameOwner: owner,
      joiner: this.username
    })
  }

  getHand() {
    let observable = new Observable<String[]>(observer => {
      this.socket.on('start game', (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }  
}