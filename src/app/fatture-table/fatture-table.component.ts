import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Fattura, TipologiaFattura } from '../domain/fattura';
import { FatturaDialogComponent } from '../fattura-dialog/fattura-dialog.component';

@Component({
  selector: 'app-fatture-table',
  templateUrl: './fatture-table.component.html',
  styleUrls: ['./fatture-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FattureTableComponent {

  @Input() fatture: Fattura[];
  @Output() onEditFattura = new EventEmitter<Fattura>();
  @Output() onDeleteFattura = new EventEmitter<Fattura>();

  TipologiaFattura = TipologiaFattura;
  displayedColumns: string[] = ['destinatario', 'servizio', 'dataEmissione', 'stato', 'importo', 'tipologia', 'azioni'];

  constructor() {}

  editFattura(fattura: Fattura) {
    this.onEditFattura.emit(fattura);
  }

  deleteFattura(fattura: Fattura) {
    this.onDeleteFattura.emit(fattura);
  }

}
