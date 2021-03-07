import { WaitingTimesState } from '../interfaces/waitingtimes.interface';
import { ApiProperty } from '@nestjs/swagger';

export class WaitingTimesDto {
  @ApiProperty()
  ride_id: string;

  @ApiProperty()
  date?: string;

  @ApiProperty()
  state: WaitingTimesState;

  @ApiProperty()
  wait: number;

  @ApiProperty()
  original: any;
}
