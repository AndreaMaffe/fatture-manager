import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fattura, TipologiaFattura } from '../domain/fattura';

@Injectable({
  providedIn: 'root',
})
export class FattureService {

  private endpoint: string = 'http://localhost:8080' //'https://fatture-manager.herokuapp.com'; //

  private constructor(private httpClient: HttpClient) {}

  getFatture(): Observable<Fattura[]> {
    return this.httpClient.get<Fattura[]>(this.endpoint + '/fatture');
  }

  postFattura(fattura: Fattura): Observable<Fattura> {
    return this.httpClient.post<Fattura>(this.endpoint + '/fatture', fattura);
  }

  putFattura(fattura: Fattura): Observable<Fattura> {
    return this.httpClient.put<Fattura>(this.endpoint + '/fatture/' + fattura._id, fattura);
  }

  deleteFattura(fattura: Fattura): Observable<string> {
    return this.httpClient.delete<string>(this.endpoint + '/fatture/' + fattura._id);
  }

  getDataFineFattura(fattura: Fattura): Date {
    if (fattura.dataDiPartenza) {
      const dataDiPartenza = new Date(fattura.dataDiPartenza);
      let offset;
      switch (Number(fattura.tipologia)) {
        case TipologiaFattura.mensile: offset=30*24*60*60*1000; break;
        case TipologiaFattura.annuale: offset=365*24*60*60*1000; break;
        case TipologiaFattura.bimestrale: offset=60*24*60*60*1000; break;
        case TipologiaFattura.trimestrale: offset=90*24*60*60*1000; break;
        case TipologiaFattura.semestrale: offset=183*24*60*60*1000; break;
      }
      const dataFine = new Date(dataDiPartenza.getTime() + offset);
      return dataFine;
    }
    else return null;
  }

  isFatturaInRitardo(fattura: Fattura): boolean {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const a = new Date(fattura.dataEmissione);
    const b = new Date();
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    if (Math.floor((utc2 - utc1) / _MS_PER_DAY) > 30)
      return true;
    else return false;
  }
}
