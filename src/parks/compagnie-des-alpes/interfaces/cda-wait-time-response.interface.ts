export interface BellewaerdeWaitTimeInterface {
  'id': string,
  'time': number,
  'status': 'open' | 'closed' | string,
  'customText': null
  'shows'?: { start: string, duration: string }[]
}
