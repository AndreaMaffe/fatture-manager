import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Fattura } from '../domain/fattura';

@Component({
  templateUrl: './fattura-dialog.component.html',
  styleUrls: ['./fattura-dialog.component.scss']
})
export class FatturaDialogComponent {

  tipologiePagamento = [
    {value: '0', display: 'Una tantum'},
    {value: '1', display: 'Mensile'},
    {value: '2', display: 'Bimestrale'},
    {value: '3', display: 'Trimestrale'},
    {value: '4', display: 'Semestrale'},
    {value: '5', display: 'Annuale'}
  ];

  constructor(
    public dialogRef: MatDialogRef<FatturaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Fattura) {}

  close(): void {
    this.dialogRef.close();
  }

}
