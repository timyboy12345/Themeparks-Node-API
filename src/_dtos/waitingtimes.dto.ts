import { ApiProperty } from '@nestjs/swagger';
import { PoiStatus } from '../_interfaces/poi.interface';

export class WaitingTimesDto {
  @ApiProperty()
  ride_id: string;

  @ApiProperty()
  date?: string;

  @ApiProperty()
  state: PoiStatus;

  @ApiProperty()
  wait: number;

  @ApiProperty()
  original: any;
}
