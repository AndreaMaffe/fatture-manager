import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FatturaDialogComponent } from './fattura-dialog/fattura-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fatture-manager';
  logoSrc = 'assets/logo-codigital.png';

  constructor(private dialogService: MatDialog) {}

  openAddFatturaDialog() {
    const dialogRef = this.dialogService.open(FatturaDialogComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
