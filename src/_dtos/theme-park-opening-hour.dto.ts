import { ApiProperty } from '@nestjs/swagger';

export class ThemeParkOpeningTimeDto {
  @ApiProperty({
    description: 'The opening date and time',
    required: true
  })
  open: string;

  @ApiProperty({
    description: 'The opening time',
    required: true
  })
  openTime: string;

  @ApiProperty({
    description: 'The closing date and time',
    required: true
  })
  close: string;

  @ApiProperty({
    description: 'The closing time',
    required: true
  })
  closeTime: string;

  @ApiProperty({
    description: 'Any possible comments that were made by the park',
    required: true
  })
  comments?: string[];
}

export class ThemeParkOpeningHourDto {
  @ApiProperty({
    example: '2023-04-07',
    description: 'The date for this set of opening times',
    required: true,
  })
  date: string;

  @ApiProperty({
    description: 'An array of strings containing all special events that will occur on this date',
    required: false
  })
  events?: string[];

  @ApiProperty({
    description: 'An array of opening times for this date',
    required: true,
    isArray: true,
    type: ThemeParkOpeningTimeDto
  })
  openingTimes: ThemeParkOpeningTimeDto[]
}
