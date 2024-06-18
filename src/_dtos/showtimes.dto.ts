import { ApiProperty } from '@nestjs/swagger';

export class ShowTimesDto {
  @ApiProperty({
    description: 'The duration of the show, in minutes',
    example: 15,
  })
  duration?: number;

  @ApiProperty({
    description: 'The current date and time, at this park, to use as reference',
    example: '2021-01-20T12:00:00',
  })
  currentDate: string;

  @ApiProperty({
    description: 'The array of all show times for this show, these may have already passed or be from another date',
  })
  showTimes: ShowTimeDto[];

  @ApiProperty({
    description: 'The timezone this park is in',
    example: 'Europe/Amsterdam',
  })
  timezone: string;
}

export class ShowTimeDto {
  @ApiProperty({
    description: 'The ID of this show, either given by the park or assigned by us',
  })
  id?: string;

  @ApiProperty({
    description: 'The local date (YYYY-MM-DD) the show starts, for the local timezone of the park',
    example: '2024-12-23',
  })
  localFromDate: string;

  @ApiProperty({
    description: 'The local time (HH:mm) the show starts at, for the local timezone of the park',
    example: '19:00',
  })
  localFromTime: string;

  @ApiProperty({
    description: 'The local date (YYYY-MM-DD) the show ends, for the local timezone of the park',
    example: '2024-12-23',
  })
  localToDate?: string;

  @ApiProperty({
    description: 'The time (HH:mm) the show ends, for the local timezone of the park',
    example: '19:45',
  })
  localToTime?: string;

  @ApiProperty({
    description: 'The full datetime the show starts, with timezone information',
  })
  timezoneFrom: string;

  @ApiProperty({
    description: 'The full datetime the show ends, with timezone information',
  })
  timezoneTo?: string;

  @ApiProperty({
    description: 'The duration of this specific show, measured in minutes',
    example: 15,
  })
  duration?: number;

  @ApiProperty({
    description: 'A true/false value to indicate if the show has already started',
    example: 'true',
  })
  isPassed?: boolean;

  @ApiProperty({
    description: 'Additional information given by the park about this specific performance, like the show name',
    example: 'Edition 2024',
  })
  edition?: string;
}
