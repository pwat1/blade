import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models/message.model'

@Component({
  selector: 'app-messageline',
  templateUrl: './messageline.component.html',
  styleUrls: ['./messageline.component.css']
})
export class MessagelineComponent implements OnInit {
  @Input() message: Message;

  constructor() { }

  ngOnInit() {
  }

  getColor() {
    return `{"color:" ${this.message.color}`
  }

}
