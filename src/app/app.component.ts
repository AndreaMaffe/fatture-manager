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
  fattureVisualizzate: Fattura[];

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
        console.log(result);
        const fattura: Fattura = {
          nomeServizio: result.nomeServizio,
          dataEmissione: result.dataEmissione,
          dataScadenza: result.dataScadenza,
          dataDiPartenza: result.dataDiPartenza,
          importo: result.importo,
          tipologia: result.tipologia,
          pagata: result.pagata,
          intestatario: {
            nome: result.nome,
            indirizzo: result.indirizzo,
            telefono: result.telefono,
            email: result.email,
            iban: result.iban,
            pec: result.pec,
            codiceUnivoco: result.codiceUnivoco,
            partitaIva: result.partitaIva
          }
        }
        this.postFattura(fattura);
      }
      else console.log("errore");
    });
  }

  openEditFatturaDialog(fattura: Fattura) {
    const dialogRef = this.dialogService.open(FatturaDialogComponent, {
      width: '600px',
      data: {
        _id: fattura._id,
        nomeServizio: fattura.nomeServizio,
        dataEmissione: fattura.dataEmissione,
        dataScadenza: fattura.dataScadenza,
        dataDiPartenza: fattura.dataDiPartenza,
        importo: fattura.importo,
        tipologia: fattura.tipologia,
        pagata: fattura.pagata,
        nome: fattura.intestatario.nome,
        indirizzo: fattura.intestatario.indirizzo,
        telefono: fattura.intestatario.telefono,
        email: fattura.intestatario.email,
        iban: fattura.intestatario.iban,
        pec: fattura.intestatario.pec,
        codiceUnivoco: fattura.intestatario.codiceUnivoco,
        partitaIva: fattura.intestatario.partitaIva
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const fattura: Fattura = {
          _id: result._id,
          nomeServizio: result.nomeServizio,
          dataEmissione: result.dataEmissione,
          dataScadenza: result.dataScadenza,
          dataDiPartenza: result.dataDiPartenza,
          importo: result.importo,
          tipologia: result.tipologia,
          pagata: result.pagata,
          intestatario: {
            nome: result.nome,
            indirizzo: result.indirizzo,
            telefono: result.telefono,
            email: result.email,
            iban: result.iban,
            pec: result.pec,
            codiceUnivoco: result.codiceUnivoco,
            partitaIva: result.partitaIva
          }
        }
        console.log({result});
        this.putFattura(fattura);
      }
    });
  }

  getFatture() {
    this.fattureService.getFatture().subscribe( (data: Fattura[]) => {
      console.log({data});
      this.fatture = data;
      this.fattureVisualizzate = data.sort(this.compareFatture);
    })
  }

  postFattura(fattura: Fattura) {
    console.log({fattura});
    this.fattureService.postFattura(fattura).subscribe( (data: Fattura) => {
      this.fatture.push(data);
      this.fattureVisualizzate = [...this.fatture].sort(this.compareFatture);;
    });
  }

  putFattura(fattura: Fattura) {
    console.log({fattura});
    this.fattureService.putFattura(fattura).subscribe( (oldFattura: Fattura) => {
      const fatturaDaModificare = this.fatture.find(f => f._id === fattura._id);
      const index = this.fatture.indexOf(fatturaDaModificare);
      this.fatture[index] = fattura;
      this.fattureVisualizzate = [...this.fatture].sort(this.compareFatture);
      if (!oldFattura.dataEmissione && fattura.dataEmissione && fattura.tipologia && fattura.tipologia !== 0)
        this.repeatFattura(fattura);
    });
  }

  deleteFattura(fattura: Fattura) {
    const dialogRef = this.dialogService.open(ConfirmDialogComponent, {
      width: '800px',
      data: {
        titolo: 'Conferma eliminazione fattura',
        testo: 'Sei sicuro di voler eliminare la fattura \"' + fattura.nomeServizio + '\"?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fattureService.deleteFattura(fattura).subscribe( (data: any) => {
          this.fatture = [...this.fatture.filter(fattura => fattura._id !== data._id)];
          this.fattureVisualizzate = this.fatture.sort(this.compareFatture);
        })
      }
    });
  }

  repeatFattura(fattura: Fattura) {
    let newFattura = {...fattura};
    const newDateDiPartenza = this.fattureService.getDataFineFattura(fattura);
    newFattura._id = null;
    newFattura.dataDiPartenza = newDateDiPartenza;
    newFattura.dataEmissione = null;
    newFattura.pagata = false;
    this.postFattura(newFattura);
  }

  compareFatture (f1: Fattura, f2: Fattura) {
    if ( f1.intestatario.nome < f2.intestatario.nome ){
      return -1;
    }
    if ( f1.intestatario.nome > f2.intestatario.nome ){
      return 1;
    }
    return 0;
  }

  filterFatture(filter: string) {
    switch(filter) {
      case 'TUTTE': this.fattureVisualizzate = this.fatture; break;
      case 'PAGATE': this.fattureVisualizzate = this.fatture.filter(fatt => fatt.pagata); break;
      case 'DA_FATTURARE': this.fattureVisualizzate = this.fatture.filter(fatt => !fatt.dataEmissione); break;
      case 'IN_PAGAMENTO': this.fattureVisualizzate = this.fatture.filter(fatt => fatt.dataEmissione && !fatt.pagata); break;
    }
  }
}
