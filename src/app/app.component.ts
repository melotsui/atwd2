import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Market';
  parent_marketList: any;
  mainToModal: any;

  constructor() {
  }

  getMsgFromSidebar(event: any) {
    this.parent_marketList = event;
  }

  getMsgFromMain(event: any) {
    this.mainToModal = event;
  }

  ngOnInit() {
    
  }
}
