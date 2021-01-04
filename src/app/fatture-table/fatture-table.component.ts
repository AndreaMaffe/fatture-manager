import { Component, OnInit } from '@angular/core';
import { Fattura } from '../domain/fattura';
import { FattureService } from './fatture.service';

@Component({
  selector: 'app-fatture-table',
  templateUrl: './fatture-table.component.html',
  styleUrls: ['./fatture-table.component.css']
})
export class FattureTableComponent implements OnInit {
  displayedColumns: string[] = ['destinatario', 'importo'];
  fatture: Fattura[];

  constructor(private fattureService: FattureService) {}

  ngOnInit() {
    this.fattureService.getAssociazioni().subscribe(data => {
      this.fatture = data;
    })
  }
}
