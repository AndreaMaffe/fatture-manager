import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Fattura } from './domain/fattura';
import { FatturaDialogComponent } from './fattura-dialog/fattura-dialog.component';
import { FattureService } from './services/fatture.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
      if (result) {
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
      }
    });
  }

  openEditFatturaDialog(fattura: Fattura) {
    const dialogRef = this.dialogService.open(FatturaDialogComponent, {
      width: '600px',
      data: fattura
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const fattura: Fattura = {
          _id: result._id,
          nomeServizio: result.nomeServizio,
          dataEmissione: result.dataEmissione,
          importo: result.importo,
          tipologia: result.tipologia,
          pagata: result.pagata,
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
      }
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
    const dialogRef = this.dialogService.open(ConfirmDialogComponent, {
      width: '800px',
      data: {
        titolo: 'Conferma eliminazione fattura',
        testo: 'Sei sicuro di voler eliminare la fattura \"' + fattura.nomeServizio + '\"? L\'azione non sarà reversibile.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fattureService.deleteFattura(fattura).subscribe( (data: any) => {
          this.fatture = [...this.fatture.filter(fattura => fattura._id !== data._id)];
        })
      }
    });
  }
}
