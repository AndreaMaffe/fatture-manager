import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Fattura } from '../domain/fattura';
import { FattureService } from './fatture.service';

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
export class FattureTableComponent implements OnInit {
  displayedColumns: string[] = ['destinatario', 'dataEmissione', 'stato', 'importo', 'tipologia'];
  fatture: Fattura[];

  constructor(private fattureService: FattureService) {}

  ngOnInit() {
    this.fattureService.getFatture().subscribe(data => {
      console.log({data});
      this.fatture = data;
    })
  }
}
