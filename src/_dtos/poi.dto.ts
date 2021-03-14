import { ApiProperty } from '@nestjs/swagger';
import { PoiOpeningTimeDto } from './poi_openingtime.dto';
import { PoiCategory } from '../_interfaces/poiCategories.enum';
import { WaitingTimesDto } from './waitingtimes.dto';
import { ShowTimesDto } from './showtimes.dto';

export class PoiDto {
  @ApiProperty({
    example: 'efteling',
    description: 'The ID of the poi, unique for this park',
  })
  id: string;

  @ApiProperty({
    example: 'ATTRACTION',
    description: 'The category of POI',
  })
  category: PoiCategory;

  @ApiProperty({
    example: 'ride',
    description: 'The original category, as stated in the parks\'s API response',
  })
  original_category?: string;

  @ApiProperty({
    example: 'Symbolica',
    description: 'The name of this POI',
  })
  title: string;

  @ApiProperty({
    example: 'Paleis der Fantasie',
    required: false,
  })
  subTitle: string;

  @ApiProperty({
    example: '<p>Beleef de familie-attractie Symbolica, een betoverend paleis waar de fantasie tot leven komt. Dwaal af in de geheime gangen en magische vertrekken en val van de ene verbazing in de andere.</p> <p>Duur: 7 minuten.</p>',
  })
  description?: string;

  @ApiProperty({
    example: 'Reizenrijk',
  })
  area?: string;

  @ApiProperty()
  createdAt?: string;

  @ApiProperty()
  location: {
    lat: number,
    lng: number
  };

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
