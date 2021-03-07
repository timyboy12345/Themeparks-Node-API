import { ApiProperty } from '@nestjs/swagger';
import { PoiOpeningTimeDto } from './poi_openingtime.dto';
import { PoiCategory } from '../_interfaces/poiCategories.enum';
import { WaitingTimesDto } from './waitingtimes.dto';
import { ShowTimesDto } from './showtimes.dto';

export class PoiDto {
  @ApiProperty({
    example: 'efteling'
  })
  id: string;

  @ApiProperty({
    example: 'ATTRACTION'
  })
  category: PoiCategory;

  @ApiProperty({
    example: 'ride'
  })
  original_category?: string;

  @ApiProperty({
    example: 'Symbolica'
  })
  title: string;

  @ApiProperty({
    example: '<p>Beleef de familie-attractie Symbolica, een betoverend paleis waar de fantasie tot leven komt. Dwaal af in de geheime gangen en magische vertrekken en val van de ene verbazing in de andere.</p> <p>Duur: 7 minuten.</p>'
  })
  description?: string;

  @ApiProperty({
    example: 'Reizenrijk'
  })
  area?: string;

  @ApiProperty()
  createdAt?: string;

  @ApiProperty()
  entrance?: {
    id?: string,
    world?: {
      lat: number,
      lng: number
    },
    map?: {
      lat: number,
      lng: number
    }
  };

  @ApiProperty()
  exit?: {
    id?: string,
    world?: {
      lat: number,
      lng: number
    },
    map?: {
      lat: number,
      lng: number
    }
  };

  @ApiProperty()
  maxAge?: string;

  @ApiProperty()
  maxSize?: string;

  @ApiProperty()
  minAge?: number;
  minSize?: number;

  @ApiProperty()
  minSizeEscort?: number;

  @ApiProperty()
  tags?: string[];

  @ApiProperty()
  image_url?: string;

  @ApiProperty()
  website_url?: string;

  @ApiProperty()
  fastpass?: boolean;

  @ApiProperty()
  featured?: boolean;

  @ApiProperty()
  photoPoint?: boolean;

  @ApiProperty()
  images?: string[];

  @ApiProperty()
  waitingTimes?: WaitingTimesDto;

  @ApiProperty()
  showTimes?: ShowTimesDto;

  @ApiProperty()
  openingTimes?: PoiOpeningTimeDto[];

  @ApiProperty()
  original: any;
}
