export interface Fattura {
  _id?: string,
  nomeServizio: string,
  importo: number;
  intestatario: IntestatarioFattura;
  dataEmissione?;
  tipologia?: TipologiaFattura
}

export enum TipologiaFattura {
  una_tantum = 0,
  mensile = 1,
  annuale = 2,
}

export interface IntestatarioFattura {
  nome: string;
  indirizzo?: string;
  telefono?: string;
  email?: string;
  iban?: string;
  pec?: string;
  codiceFiscale?: string;
}
