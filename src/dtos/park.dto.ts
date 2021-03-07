import { ApiProperty } from '@nestjs/swagger';

export class ParkDto {
  @ApiProperty({
    example: 'efteling'
  })
  id: string;

  @ApiProperty({
    example: 'Efteling'
  })
  name: string;

  @ApiProperty({
    example: 'https://example.com/efteling.jpg'
  })
  image: string;

  @ApiProperty({
    example: 'nl'
  })
  countryCode: string;
}
