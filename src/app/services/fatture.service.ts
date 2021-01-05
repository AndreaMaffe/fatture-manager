import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fattura } from '../domain/fattura';

@Injectable({
  providedIn: 'root',
})
export class FattureService {

  private endpoint: string = 'https://fatture-manager.herokuapp.com';

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
}
