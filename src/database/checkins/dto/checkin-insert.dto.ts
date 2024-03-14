import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckinInsertDto {
  @IsString()
  @ApiProperty({
    type: String,
    example: 'efteling'
  })
  parkId: string

  @IsString()
  @ApiProperty({
    type: String,
    example: 'baron1898'
  })
  rideId: string

  @IsString()
  @ApiProperty({
    type: String,
    example: '2024-03-14'
  })
  dateTime: string

  @IsNumber()
  @ApiProperty({
    type: Number,
    example: '10'
  })
  waitTime: string
}
