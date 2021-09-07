export interface HerschendResponseItemInterface {
  'rideId': number,
  'rideName': string,
  'operationStatus': HerschendResponseItemOperationStatus,
  'waitTime': number,
  'waitTimeDisplay': 'NO WAIT' | string | 'TEMPORARILY CLOSED',
  'waitTimeDate': number,
  'error': null
}

export enum HerschendResponseItemOperationStatus {
  'TEMPORARILY CLOSED' = 'TEMPORARILY CLOSED',
  'OPEN' = 'OPEN',
  'UNKNOWN' = 'UNKNOWN',
  'CLOSED' = 'CLOSED'
}
