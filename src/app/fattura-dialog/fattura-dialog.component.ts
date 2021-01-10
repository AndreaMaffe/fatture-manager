import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './fattura-dialog.component.html',
  styleUrls: ['./fattura-dialog.component.scss']
})
export class FatturaDialogComponent {

  data: any;

  tipologiePagamento = [
    {value: '0', display: 'Una tantum'},
    {value: '1', display: 'Mensile'},
    {value: '2', display: 'Annuale'},
    {value: '3', display: 'Bimestrale'},
    {value: '4', display: 'Trimestrale'},
    {value: '5', display: 'Semestrale'}

  ];

  constructor(
    public dialogRef: MatDialogRef<FatturaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public d: any) {
      this.data = d;
      console.log(this.data);
    }

}
