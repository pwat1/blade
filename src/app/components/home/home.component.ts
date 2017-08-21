import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: String;
  private submitted = false;
  
  constructor(private router:Router) {

  }

  ngOnInit() {

  }

  submit() {
    if(this.username)
      //this.router.navigate(['/chat', this.username]);
      this.submitted = true;
    } 
  } 
