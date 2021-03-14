import { ApiProperty } from '@nestjs/swagger';

export class ThemeParkSupportsDto {
  @ApiProperty()
  supportsPois: boolean;

  @ApiProperty()
  supportsRestaurants: boolean;

  @ApiProperty()
  supportsRestaurantWaitTimes: boolean;

  @ApiProperty()
  supportsRides: boolean;

  @ApiProperty()
  supportsRideWaitTimes: boolean;

  @ApiProperty()
  supportsShows: boolean;

  @ApiProperty()
  supportsShowTimes: boolean;
}
