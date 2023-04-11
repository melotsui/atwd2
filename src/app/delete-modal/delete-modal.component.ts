import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


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
