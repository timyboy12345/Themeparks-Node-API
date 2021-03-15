import { ApiProperty } from '@nestjs/swagger';
import { PoiOpeningTimeDto } from './poi-openingtime.dto';
import { PoiCategory } from '../_interfaces/poi-categories.enum';
import { WaitingTimesDto } from './waitingtimes.dto';
import { ShowTimesDto } from './showtimes.dto';

export class PoiDto {
  @ApiProperty({
    example: 'efteling',
    description: 'The ID of the poi, unique for this park',
    required: true,
  })
  id: string;

  @ApiProperty({
    example: 'ATTRACTION',
    description: 'The category of POI',
    required: true,
  })
  category: PoiCategory;

  @ApiProperty({
    example: 'ride',
    description: 'The original category, as stated in the parks\'s API response',
    required: false,
  })
  original_category?: string;

  @ApiProperty({
    example: 'Symbolica',
    description: 'The name of this POI',
    required: true,
  })
  title: string;

  @ApiProperty({
    example: 'Paleis der Fantasie',
    description: 'A short description that describes the POI',
    required: false,
  })
  subTitle?: string;

  @ApiProperty({
    description: 'A longer description that fully describes the POI, in HTML format',
    example: '<p>Beleef de familie-attractie Symbolica, een betoverend paleis waar de fantasie tot leven komt. Dwaal af in de geheime gangen en magische vertrekken en val van de ene verbazing in de andere.</p> <p>Duur: 7 minuten.</p>',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'The area the ride is located in',
    example: 'Reizenrijk',
    required: false,
  })
  area?: string;

  @ApiProperty({
    required: false,
  })
  createdAt?: string;

  @ApiProperty({
    description: 'A possible location for this POI',
    required: false,
  })
  location?: {
    lat: number,
    lng: number
  };

  @ApiProperty({
    description: 'A more detailed location of the entrance of this POI, not often used',
    required: false,
  })
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

  @ApiProperty({
    description: 'A more detailed location of the exit of this POI, not often used',
    required: false,
  })
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

  @ApiProperty({
    description: 'The maximum age that someone is allowed to ride this ride',
    required: false,
  })
  maxAge?: string;

  @ApiProperty({
    description: 'The maximum size in meters that someone is allowed to be to ride this ride',
    required: false,
  })
  maxSize?: string;

  @ApiProperty({
    description: 'The minimum age someone has to be to be allowed to ride this ride',
    required: false,
  })
  minAge?: number;

  @ApiProperty({
    description: 'The minimum size in meters that someone has to be is allowed to ride this ride',
    required: false,
  })
  minSize?: number;

  @ApiProperty({
    description: 'The minimum size in meters before someone is allowed to ride this ride on their own',
    required: false,
  })
  minSizeEscort?: number;

  @ApiProperty({
    description: 'Tags that are given to this ride',
    required: false,
  })
  tags?: string[];

  @ApiProperty({
    description: 'The main image of this ride, for cards and previews',
    required: false,
  })
  image_url?: string;

  @ApiProperty({
    description: 'An URL where more information about this ride can be gathered',
    required: false,
  })
  website_url?: string;

  @ApiProperty({
    description: 'Whether this ride supports fastpass or not',
    required: false,
  })
  fastpass?: boolean;

  @ApiProperty({
    description: 'If the ride is featured by the themepark',
    required: false,
  })
  featured?: boolean;

  @ApiProperty({
    description: 'If the ride has a photo point',
    required: false,
  })
  photoPoint?: boolean;

  @ApiProperty({
    description: 'An array of more images, when more images are provided by the park',
    required: false,
  })
  images?: string[];

  @ApiProperty({
    description: 'The current waiting time',
    required: false,
  })
  waitingTimes?: WaitingTimesDto;

  @ApiProperty({
    description: 'The show times of today',
    required: false,
  })
  showTimes?: ShowTimesDto;

  @ApiProperty({
    description: 'Opening times of this POI',
    required: false,
  })
  openingTimes?: PoiOpeningTimeDto[];

  @ApiProperty({
    description: 'The original object as send by the theme park',
    required: false,
  })
  original: any;
}
