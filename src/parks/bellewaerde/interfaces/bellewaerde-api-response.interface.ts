export interface BellewaerdeApiResponseInterface {

}

export interface BellewaerdeApiResponseItemInterface {
  'id': string,
  'open': string,
  'close': string,
  'wait': string,
  'shows': BellewaerdeApiResponseShowTimeInterface[]
}

export interface BellewaerdeApiResponseShowTimeInterface {
  start: string;
  duration: string;
}
