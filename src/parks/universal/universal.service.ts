import { Injectable } from '@nestjs/common';
import { CompanyService } from '../../_services/company/company.service';
import { ThemeParkService } from '../../_services/themepark/theme-park.service';
import { UniversalStudiosFloridaService } from './universal-studios-florida/universal-studios-florida.service';
import { IslandsOfAdventureService } from './islands-of-adventure/islands-of-adventure.service';
import { UniversalStudiosHollywoodService } from './universal-studios-hollywood/universal-studios-hollywood.service';

@Injectable()
export class UniversalService extends CompanyService {
  constructor(private readonly universalStudiosFlorida: UniversalStudiosFloridaService,
              private readonly islandsOfAdventure: IslandsOfAdventureService,
              private readonly universalStudiosHollywood: UniversalStudiosHollywoodService) {
    super();
  }

  async getParkServices(): Promise<ThemeParkService[]> {
    return [
      this.universalStudiosFlorida,
      this.islandsOfAdventure,
      this.universalStudiosHollywood
    ];
  }
}
