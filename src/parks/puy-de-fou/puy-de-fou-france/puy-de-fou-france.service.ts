import { Injectable } from '@nestjs/common';
import { PuyDeFouGeneralService } from '../puy-de-fou-general/puy-de-fou-general.service';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';

@Injectable()
export class PuyDeFouFranceService extends PuyDeFouGeneralService {
  getInfo(): ThemePark {
    return {
      countryCode: 'fr', description: '', id: 'puy-de-fou', image: '', name: 'Puy de Fou', parkType: ParkType.THEMEPARK,
    };
  }

  getFileUrl(): string {
    return 'https://cdn.mobile.puydufou.com/004759/appdata/wzobj_inventory_QqnqAbNBW/sqlite.sqlite';
  }
}
