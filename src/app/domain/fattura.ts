export interface Fattura {
  _id?: string,
  nomeServizio: string,
  importo?: number;
  intestatario: IntestatarioFattura;
  dataEmissione?: Date;
  dataScadenza?: Date;
  dataDiPartenza?: Date,
  tipologia?: TipologiaFattura,
  pagata?: boolean
}

export enum TipologiaFattura {
  una_tantum = 0,
  mensile = 1,
  annuale = 2,
  bimestrale = 3,
  trimestrale = 4,
  semestrale = 5
}

export interface IntestatarioFattura {
  nome: string;
  indirizzo?: string;
  telefono?: string;
  email?: string;
  iban?: string;
  pec?: string;
  codiceUnivoco?: string;
  partitaIva?: string;
}
