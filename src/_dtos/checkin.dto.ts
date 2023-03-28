import { ApiProperty } from '@nestjs/swagger';

export class CheckinDto {
  @ApiProperty({
    example: 1
  })
  id: string;

  @ApiProperty({
    description: 'The date and time of the visit according to the user',
    example: '2023-03-28T00:00:00.000Z'
  })
  dateTime: string;

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
    example: 'efteling-fata-morgana'
  })
  rideId: string;

  @ApiProperty({
    description: "The amount of time the user waited according to him/herself",
    example: 5
  })
  waitTime: number;
}
