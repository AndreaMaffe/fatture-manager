export interface Fattura {
  importo: number;
  intestatario: IntestatarioFattura;
  dataEmissione;
  tipologia: TipologiaFattura
}

export enum TipologiaFattura {
  UNA_TANTUM,
  MENSILE,
  ANNUALE
}

export interface IntestatarioFattura {
  nome: string;
  indirizzo: string;
  telefono: string;
  email: string;
  iban: string;
  pec: string;
  codiceFiscale: string;
}
