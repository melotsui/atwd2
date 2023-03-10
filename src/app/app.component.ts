import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { MainComponent } from './main/main.component';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Market';
  parent_marketList: any;
  mainToModal: any;


  getMsgFromSidebar(event: any) {
    this.parent_marketList = event;
  }

  getMsgFromMain(event: any) {
    this.mainToModal = event;
  }

  ngOnInit() {
    
  }
}
