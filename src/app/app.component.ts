import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Market';
  parent_sidebarData: any;

  constructor() {
    this.parent_sidebarData = new Object({
      name: '',
      region: '',
      district: '',
      tc: ''
    });
  }

  getMsgFromBaby(event: any) {
    this.parent_sidebarData = event;
    console.log(`Parent: ${this.parent_sidebarData.name}`)
  }

  ngOnInit() {
    console.log(`title: ${this.title}`);
  }
}
