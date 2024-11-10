import { Injectable } from '@nestjs/common';
import { TransferService } from '../../../_services/transfer/transfer.service';
import { Poi } from '../../../_interfaces/poi.interface';
import * as moment from 'moment-timezone';
import { ShowTime, ShowTimes } from '../../../_interfaces/showtimes.interface';
import { PoiCategory } from '../../../_interfaces/poi-categories.enum';
import { BlijdorpAnimalInterface } from '../interfaces/blijdorp-animals-response.interface';

@Injectable()
export class BlijdorpTransferService extends TransferService {
  transferShowToPoi(poi: any): Poi {
    const currentDate = moment().tz('Europe/Amsterdam');

    // TODO: Actually try to read the show time, hidden somewhere in the data
    let show: ShowTime;

    const showTimes: ShowTimes = {
      timezone: 'Europe/Amsterdam',
      showTimes: [],
      currentDate: currentDate.format('YYYY-MM-DD'),
      currentDateTimezone: currentDate.format(),
    };

    return {
      id: poi.node._meta.uid,
      title: poi.node.title,
      description: poi.node.description && poi.node.description.length > 0 ? poi.node.description[0].text : null,
      image_url: poi.node.main_image.url,
      previewImage: poi.node.main_image.url + "&w=400",
      showTimes: showTimes,
      category: PoiCategory.SHOW,
      original: poi,
    };
  }

  transferAnimalToPoi(animal: BlijdorpAnimalInterface, locale?: string): Poi {
    return {
      category: PoiCategory.ANIMAL,
      id: animal.title.replace(' ', '-').toLowerCase(),
      original: animal,
      title: animal.title,
      website_url: 'https://diergaardeblijdorp.nl' + animal.link,
      description: animal.description,
      images: [animal.image.url],
      image_url: animal.image.url,
      previewImage: animal.image.url.replace('w=10000', 'w=400').replace('h=13000', 'h=400'),
    };
  }

  stringToId(string: string) {
    return string
      .normalize('NFKD') // split accented characters into their base characters and diacritical marks
      .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
      .trim() // trim leading or trailing whitespace
      .toLowerCase() // convert to lowercase
      .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
      .replace(/\s+/g, '-') // replace spaces with hyphens
      .replace(/-+/g, '-'); // remove consecutive hyphens
  }
}
