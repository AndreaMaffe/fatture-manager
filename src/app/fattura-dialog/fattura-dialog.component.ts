import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Fattura } from '../domain/fattura';

@Component({
  templateUrl: './fattura-dialog.component.html',
  styleUrls: ['./fattura-dialog.component.css']
})
export class FatturaDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<FatturaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Fattura) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
