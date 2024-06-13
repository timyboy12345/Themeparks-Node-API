export interface SeaworldWaitTimesInterface {
  'WaitTimes': [],
  'ShowTimes': {
    'Id': string,
    'ShowTimes': {
      // 'StartDateTime': '2024-06-12T19:00:00Z',
      // 'EndDateTime': '2024-06-12T19:30:00Z',
      // 'StartTime': '2024-06-12T12:00:00',
      // 'EndTime': '2024-06-12T12:30:00'
      'StartDateTime': string,
      'EndDateTime': string,
      'StartTime': string,
      'EndTime': string
    }[]
  }[]
}
