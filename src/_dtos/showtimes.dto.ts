import { ApiProperty } from '@nestjs/swagger';

export class ShowTimesDto {
  @ApiProperty({
    example: 15
  })
  duration?: number;

  @ApiProperty({
    example: '2021-01-20T12:00:00'
  })
  currentDate: string;

  @ApiProperty()
  allShowTimes: ShowTimeDto[];

  @ApiProperty()
  todayShowTimes: ShowTimeDto[];

  @ApiProperty()
  otherDateShowTimes?: ShowTimeDto[];

  @ApiProperty()
  pastShowTimes: ShowTimeDto[];

  @ApiProperty()
  futureShowTimes: ShowTimeDto[];
}

export class ShowTimeDto {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  from: string;

  @ApiProperty()
  fromTime: string;

  @ApiProperty()
  to?: string;

  @ApiProperty()
  duration?: number;

  @ApiProperty()
  isPassed?: boolean;

  @ApiProperty()
  edition?: string;
}
