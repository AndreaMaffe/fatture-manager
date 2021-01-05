import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fattura } from '../domain/fattura';

@Injectable({
  providedIn: 'root',
})
export class FattureService {

  private endpoint: string = 'http://localhost:8080'; //'https://fatture-manager.herokuapp.com/fatture';

  private constructor(private httpClient: HttpClient) {}

  getFatture(): Observable<Fattura[]> {
    return this.httpClient.get<Fattura[]>(this.endpoint + '/fatture');
  }

  /*
  postFattura(fattura: Fattura): Observable<Fattura> {
    return this.httpClient.post<Fattura>(this.endpoint + '/fatture');
  }
  */
}
