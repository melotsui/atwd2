import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.css']
})
export class CreateModalComponent {
  dialogRef: MatDialogRef<CreateModalComponent>;

  constructor(dialogRef: MatDialogRef<CreateModalComponent>) {
    this.dialogRef = dialogRef;
  }

  closeModal() {
    this.dialogRef.close();
  }


}
