import { ApiProperty } from '@nestjs/swagger';

export class PoiOpeningTimeDto {
  @ApiProperty({
    example: '10:00:00',
  })
  open: string;

  @ApiProperty({
    example: '18:00:00',
  })
  close?: string;

  @ApiProperty({
    example: '10:00:00',
  })
  openTime: string;

  @ApiProperty({
    example: '2021-01-20',
  })
  date: string;

  @ApiProperty({
    example: '18:00:00',
  })
  closeTime?: string;

  @ApiProperty({
    example: false,
  })
  isPassed?: boolean;

  @ApiProperty()
  comments?: string;
}
