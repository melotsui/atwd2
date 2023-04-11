import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {FormGroup, FormBuilder, Validators, Form} from '@angular/forms';  
import {HttpClient, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css']
})
export class UpdateModalComponent {
  dialogRef: MatDialogRef<UpdateModalComponent>;

  constructor(dialogRef: MatDialogRef<UpdateModalComponent>) {
    this.dialogRef = dialogRef;
  }

  closeModal() {
    this.dialogRef.close();
  }


}
