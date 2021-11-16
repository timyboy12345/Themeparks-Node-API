import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi, PoiStatus } from '../../../_interfaces/poi.interface';
import { HerschendResponseItemInterface } from '../interfaces/herschend-response.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';

@Injectable()
export class HerschendTransferService extends TransferService{
  transferRideToPoi(poi: HerschendResponseItemInterface): Poi {
    const p: Poi = {
      id: `${poi.rideId}`,
      title: poi.rideName,
      original: poi,
      category: PoiCategory.ATTRACTION
    }

    switch (poi.operationStatus) {
      case 'OPEN':
        p.state = PoiStatus.OPEN;
        p.currentWaitTime = poi.waitTime;
        break;
      case 'TEMPORARILY CLOSED':
        p.state = PoiStatus.DOWN;
        break;
      case 'CLOSED':
        p.state = PoiStatus.CLOSED;
        break;
      case 'UNKNOWN':
        p.state = PoiStatus.UNDEFINED;
        break;
    }

    return p;
  }
}
