import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../../models/game.model'
import { ChatService } from '../../services/chat.service';
import { DragulaService } from 'ng2-dragula'
import { ScorePipe } from '../../pipes/score.pipe'

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  //@Input() game: Game;
  playerhand = ['Force', '1', '3', '7', 'Mirror', 'Bolt', '3', '2', '4'] //test data
  playerfield = ['1', '2']
  opphand = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
  oppfield = ['4', 'Force']

  constructor(private chatService:ChatService, private dragulaService: DragulaService, private score: ScorePipe) { 
    dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });
    dragulaService.removeModel.subscribe((value) => {
      this.onRemoveModel(value.slice(1));
    });    
  }

  ngOnInit() {
    // this.chatService.getHand().subscribe(data => {
    //   this.hand = data
    // })
  }

  private onDropModel(args) {
    let [el, target, source] = args;
    console.log(args)
    console.log(el)
    console.log(target)
    console.log(source)
    // do something else
  }

  private onRemoveModel(args) {
    let [el, source] = args;
    // do something else
  }

}
