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
  updateModalComponent: MatDialogRef<UpdateModalComponent, any> | undefined;
  deleteModalComponent: MatDialogRef<DeleteModalComponent, any> | undefined;
  matDialog: MatDialog;

  getMsgFromSidebar(event: any) {
    this.parent_marketList = event;
  }

  getMsgFromMain(event: any) {
    this.mainToModal = event;
    if(this.mainToModal['action'] == 'add'){
      this.dialogConfig.id = "createModalComponent";
      this.dialogConfig.height = "80%";
      this.dialogConfig.width = "50%";
      this.createModalDialog = this.matDialog.open(CreateModalComponent, this.dialogConfig);
    }
    if(this.mainToModal['action'] == 'edit'){
      this.dialogConfig.id = "updateModalComponent";
      this.dialogConfig.height = "80%";
      this.dialogConfig.width = "50%";
      const params = {
        mID: this.mainToModal['mID'],
      };
      this.updateModalComponent = this.matDialog.open(UpdateModalComponent,{...this.dialogConfig, data: params});
    }
    if(this.mainToModal['action'] == 'detail'){
      this.dialogConfig.id = "deleteModalComponent";
      this.dialogConfig.height = "80%";
      this.dialogConfig.width = "50%";
      const params = {
        mID: this.mainToModal['mID'],
      };
      this.deleteModalComponent = this.matDialog.open(DeleteModalComponent,{...this.dialogConfig, data: params});
    }
  }

  constructor(matDialog: MatDialog) {
    this.matDialog = matDialog;
  }

  ngOnInit() {
    
  }
}
