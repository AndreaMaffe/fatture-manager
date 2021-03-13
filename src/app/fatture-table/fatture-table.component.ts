import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Fattura, TipologiaFattura } from '../domain/fattura';
import { FattureService } from '../services/fatture.service';

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
  expandedElement: Fattura | null;
  displayedColumns: string[] = ['intestatario', 'servizio', 'importo'/*, 'dataEmissione'*/, 'stato', 'tipologia', 'periodo', 'azioni'];

  constructor(private fattureService: FattureService) {}

  editFattura(fattura: Fattura) {
    this.onEditFattura.emit(fattura);
  }

  deleteFattura(fattura: Fattura) {
    this.onDeleteFattura.emit(fattura);
  }

  getPeriodoFattura(fattura: Fattura) {
    return this.fattureService.getPeriodoFattura(fattura);
  }

  isFatturaInRitardo(fattura: Fattura) {
    return this.fattureService.isFatturaInRitardo(fattura);
  }

}
