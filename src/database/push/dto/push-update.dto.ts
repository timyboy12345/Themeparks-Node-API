import { IsBoolean, IsDate, IsNumberString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PushUpdateDto {
  @IsNumberString()
  @ApiProperty({
    type: Number,
    example: '10',
    required: true,
  })
  minutes: number;

  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    example: true,
    required: true,
  })
  downUp: boolean;

  @IsDate()
  @ApiProperty({
    type: Date,
    required: false,
  })
  statusSince: Date;

  @IsString()
  @ApiProperty({
    type: String,
    required: false,
  })
  lastStatus: string;
}
