import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PushInsertDto {
  @IsString()
  @ApiProperty({
    type: String,
    example: 'efteling',
    required: true,
  })
  parkId: string

  @IsString()
  @ApiProperty({
    type: String,
    example: 'baron1898',
    required: true,
  })
  poiId: string

  @IsNumber()
  @ApiProperty({
    type: Number,
    example: '10',
    required: true,
  })
  minutes: string
}
