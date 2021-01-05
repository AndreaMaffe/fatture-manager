import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Fattura } from './domain/fattura';
import { FatturaDialogComponent } from './fattura-dialog/fattura-dialog.component';
import { FattureService } from './services/fatture.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fatture-manager';
  logoSrc = 'assets/logo-codigital.png';
  fatture: Fattura[];

  constructor(
    private dialogService: MatDialog,
    private fattureService: FattureService
  ) {}

  ngOnInit() {
    this.getFatture();
  }

  openAddFatturaDialog() {
    const dialogRef = this.dialogService.open(FatturaDialogComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      const fattura: Fattura = {
        nomeServizio: result.nomeServizio,
        dataEmissione: result.dataEmissione,
        importo: result.importo,
        tipologia: result.tipologia,
        intestatario: {
          nome: result.nome,
          indirizzo: result.indirizzo,
          telefono: result.telefono,
          email: result.email,
          iban: result.iban,
          pec: result.pec
        }
      }
      this.postFattura(fattura);
    });
  }

  openEditFatturaDialog(fattura: Fattura) {
    const dialogRef = this.dialogService.open(FatturaDialogComponent, {
      width: '600px',
      data: fattura
    });

    dialogRef.afterClosed().subscribe(result => {
      const fattura: Fattura = {
        _id: result._id,
        nomeServizio: result.nomeServizio,
        dataEmissione: result.dataEmissione,
        importo: result.importo,
        tipologia: result.tipologia,
        intestatario: {
          nome: result.nome,
          indirizzo: result.indirizzo,
          telefono: result.telefono,
          email: result.email,
          iban: result.iban,
          pec: result.pec
        }
      }
      this.putFattura(fattura);
    });
  }

  getFatture() {
    this.fattureService.getFatture().subscribe( (data: Fattura[]) => {
      console.log({data});
      this.fatture = data;
    })
  }

  postFattura(fattura: Fattura) {
    this.fattureService.postFattura(fattura).subscribe( (data: Fattura) => {
      this.fatture.push(data);
      this.fatture = [...this.fatture];
    });
  }

  putFattura(fattura: Fattura) {
    this.fattureService.putFattura(fattura).subscribe(res => {

    });
  }

  deleteFattura(fattura: Fattura) {
    this.fattureService.deleteFattura(fattura).subscribe( (data: any) => {
      this.fatture = [...this.fatture.filter(fattura => fattura._id !== data._id)];
    })
  }
}
