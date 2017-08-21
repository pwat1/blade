import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Game } from '../../models/game.model'
@Component({
  selector: 'app-gamelist',
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.css']
})
export class GamelistComponent implements OnInit {

  @Input() games : Game[]
  @Output() join = new EventEmitter<String>()

  constructor() { }

  ngOnInit() {
  }

  joinGame(owner) {
    this.join.emit(owner)
  }
}
