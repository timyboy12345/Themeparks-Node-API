import { ApiProperty } from '@nestjs/swagger';

export class ThemeParkSupportsDto {
  @ApiProperty({
    description: 'Whether the park supports retrieving all POIs'
  })
  supportsPois: boolean;

  @ApiProperty({
    description: 'Whether the park supports retrieving all restaurants'
  })
  supportsRestaurants: boolean;

  @ApiProperty({
    description: 'Whether the park supports retrieving restaurant waiting times'
  })
  supportsRestaurantOpeningTimes: boolean;

  @ApiProperty({
    description: 'Whether the park supports retrieving all rides'
  })
  supportsRides: boolean;

  @ApiProperty({
    description: 'Whether the park supports retrieving current ride wait times'
  })
  supportsRideWaitTimes: boolean;

  @ApiProperty({
    description: 'Whether the park supports retrieving all shows'
  })
  supportsShows: boolean;

  @ApiProperty({
    description: 'Whether the park supports retrieving show times'
  })
  supportsShowTimes: boolean;

  @ApiProperty({
    description: 'Whether the park includes latitude and longitude locations for (some) POIs'
  })
  supportsPoiLocations: boolean;
}
