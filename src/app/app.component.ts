import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Market';
  parent_marketList: any;

  constructor() {
  }

  getMsgFromBaby(event: any) {
    this.parent_marketList = event;
    // console.log(`Parent: ${this.parent_marketList[0].Region}`)
  }

  ngOnInit() {
    console.log(`title: ${this.title}`);
  }
}
