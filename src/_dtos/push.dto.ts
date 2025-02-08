import { ApiProperty } from '@nestjs/swagger';

export class PushDto {
  @ApiProperty({
    example: 1
  })
  id: string;

  @ApiProperty({
    description: 'The date and time this record was inserted, could be earlier or later then the original visit time',
    example: '2023-03-28T00:00:00.000Z'
  })
  createdAt: string;

  @ApiProperty({
    example: 'efteling'
  })
  parkId: string;

  @ApiProperty({
    example: 'fata-morgana'
  })
  poiId: string;

  @ApiProperty({
    description: "The number of minutes at which the user will receive a push notification",
    example: 5
  })
  minutes: number;
}
