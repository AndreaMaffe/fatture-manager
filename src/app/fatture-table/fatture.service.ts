import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fattura } from '../domain/fattura';

@Injectable({
  providedIn: 'root',
})
export class FattureService {
  private constructor(private httpClient: HttpClient) {}

  getAssociazioni(): Observable<Fattura[]> {
    return this.httpClient.get<Fattura[]>('https://fatture-manager.herokuapp.com/fatture');
  }
}
