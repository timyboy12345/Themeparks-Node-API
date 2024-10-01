import { Controller, Get, Header, Inject, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ParkDto } from '../../_dtos/park.dto';
import { ParksService } from '../../_services/parks/parks.service';
import { Cache } from 'cache-manager';
import { ParkType } from '../../_interfaces/park.interface';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('Themeparks')
@Controller('parks')
export class ParksController {
  constructor(private readonly parksService: ParksService,
              @Inject(CACHE_MANAGER) private cacheManager: Cache) {
  }

  @Get('')
  @UseInterceptors(CacheInterceptor)
  @ApiOkResponse({
    type: ParkDto,
    isArray: true,
  })
  async getParks() {
    return (await this.parksService.getParks()).map(park => park.getFullInfo());
  }

  @Get('/readme')
  @Header('content-type', 'text/plain')
  @UseInterceptors(CacheInterceptor)
  async getParksReadme() {
    const parks = (await this.parksService.getParks()).map(park => park.getFullInfo());

    let lines = [];
    lines.push('| Park | Type | Ride Support | Restaurants Support | Shows Support | Shops Support | Halloween Support |');
    lines.push('| ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |');

    parks.sort((a, b) => {
      if (a.countryCode > b.countryCode) {
        return 1;
      }

      if (b.countryCode > a.countryCode) {
        return -1;
      }

      return 0;
    }).forEach(park => {
      let line = '|';
      line += ` ${this.countryCodeEmoji(park.countryCode)} ${park.name} | `;

      switch (park.parkType) {
        case ParkType.THEMEPARK:
        default:
          line += '🎡';
          break;
        case ParkType.WATER_PARK:
          line += '🌊';
          break;
        case ParkType.ZOO:
          line += '🦁';
          break;
      }

      line += ' |';
      line += ` ${this.capitalizeBoolean(park.supports.supportsRides)} |`;
      line += ` ${this.capitalizeBoolean(park.supports.supportsRestaurants)} |`;
      line += ` ${this.capitalizeBoolean(park.supports.supportsShows)} |`;
      line += ` ${this.capitalizeBoolean(park.supports.supportsShops)} |`;
      line += ` ${this.capitalizeBoolean(park.supports.supportsEvents)} |`;

      lines.push(line);
      // lines.push(`| ${this.countryCodeEmoji(park.countryCode)} ${park.name} | ${park.supports.supportsRides} | x | x | x |`);
    });

    return lines.join('\n');
  }

  /**
   * Convert country code to corresponding flag emoji
   * @param {string} cc - country code string
   * @returns {string} flag emoji
   */
  private countryCodeEmoji(cc): string {
    // country code regex
    const CC_REGEX = /^[a-z]{2}$/i;

    // flag emoji use 2 regional indicator symbols, and each symbol is 2 chars
    const FLAG_LENGTH = 4;

    // offset between uppercase ascii and regional indicator symbols
    const OFFSET = 127397;

    if (!CC_REGEX.test(cc)) {
      const type = typeof cc;
      throw new TypeError(
        `cc argument must be an ISO 3166-1 alpha-2 string, but got '${
          type === 'string' ? cc : type
        }' instead.`,
      );
    }

    const codePoints = [...cc.toUpperCase()].map(c => c.codePointAt() + OFFSET);
    return String.fromCodePoint(...codePoints);
  }

  /**
   * Capitalize the first letter of a word
   * @param string The string to capitalize
   * @private
   */
  private capitalize(string: string) {
    return string.slice(0, 1).toUpperCase() + string.slice(1);
  };

  private capitalizeBoolean(bool: boolean) {
    return this.capitalize(bool.toString());
  }
}
