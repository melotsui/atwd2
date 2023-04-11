import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {FormGroup, FormBuilder, Validators, Form} from '@angular/forms';  
import {HttpClient, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
  dialogRef: MatDialogRef<DeleteModalComponent>;

  constructor(dialogRef: MatDialogRef<DeleteModalComponent>) {
    this.dialogRef = dialogRef;
  }

  closeModal() {
    this.dialogRef.close();
  }


}
