import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { MainComponent } from './main/main.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { CreateModalComponent } from './create-modal/create-modal.component';
import { UpdateModalComponent } from './update-modal/update-modal.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Market';
  parent_marketList: any;
  mainToModal: any;
  dialogConfig = new MatDialogConfig();
  createModalDialog: MatDialogRef<CreateModalComponent, any> | undefined;
  matDialog: MatDialog;

  getMsgFromSidebar(event: any) {
    this.parent_marketList = event;
  }

  getMsgFromMain(event: any) {
    this.mainToModal = event;
    if(this.mainToModal['action'] == 'add'){
      this.dialogConfig.id = "createModalComponent";
      this.createModalDialog = this.matDialog.open(CreateModalComponent, this.dialogConfig);
    }
    if(this.mainToModal['action'] == 'edit'){
      this.dialogConfig.id = "updateModalComponent";
      this.createModalDialog = this.matDialog.open(UpdateModalComponent, this.dialogConfig);
    }
    if(this.mainToModal['action'] == 'detail'){
      this.dialogConfig.id = "deleteModalComponent";
      this.createModalDialog = this.matDialog.open(DeleteModalComponent, this.dialogConfig);
    }
  }

  constructor(matDialog: MatDialog) {
    this.matDialog = matDialog;
  }

  ngOnInit() {
    
  }
}
