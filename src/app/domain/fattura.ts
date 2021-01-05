export interface Fattura {
  _id?: string,
  nomeServizio: string,
  importo: number;
  intestatario: IntestatarioFattura;
  dataEmissione?;
  tipologia?: TipologiaFattura
}

export enum TipologiaFattura {
  UNA_TANTUM = 0,
  MENSILE = 1,
  ANNUALE = 2,
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
