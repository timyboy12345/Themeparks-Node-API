import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ThemeParkService } from "../../_services/themepark/theme-park.service";
import { ParkType, ThemePark } from "../../_interfaces/park.interface";
import { ThemeParkSupports } from "../../_interfaces/park-supports.interface";
import { AttraktionerResponseInterface } from "./interfaces/attraktioner-response.interface";
import { Poi } from "../../_interfaces/poi.interface";
import * as Sentry from "@sentry/node";
import { GronaLundTransferService } from "./grona-lund-transfer/grona-lund-transfer.service";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { ThemeParkOpeningTimes } from "../../_interfaces/park-openingtimes.interface";
import * as moment from "moment";

@Injectable()
export class GronaLundService extends ThemeParkService {
  constructor(
    private readonly httpService: HttpService,
    private readonly transferService: GronaLundTransferService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  getInfo(): ThemePark {
    return {
      id: "grona-lund",
      name: "Grona Lund",
      countryCode: "se",
      description:
        "Tivoli Gröna Lund is een attractiepark in de Zweedse hoofdstad Stockholm. Het park is gelegen op het schiereiland Djurgården en opende voor het eerst de poorten in 1883. In 2003 vierde het park dat het 120 jaar oud was met onder andere een nieuwe achtbaan.",
      image:
        "https://www.nordicchoicehotels.com/globalassets/global/campaign-images/nch-global-campaigns/nojespark/view-night-grona-lund.jpg?t=ScaleDownToFill%7C985x549",
      parkType: ParkType.THEMEPARK,
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsAnimals: false,
      supportsEvents: false,
      supportsOpeningTimes: true,
      supportsOpeningTimesHistory: false,
      supportsPoiLocations: false,
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: true,
      supportsRideWaitTimesHistory: true,
      supportsRides: true,
      supportsShopOpeningTimes: false,
      supportsShops: false,
      supportsShowTimes: false,
      supportsShows: false,
      supportsTranslations: false,
      textType: "HTML",
    };
  }

  async getRestaurants(): Promise<Poi[]> {
    const data: any = await this.getData(
      "/page-data/en/food-beverages/page-data.json",
    );

    let d: null;
    if (data.result.data.contentfulContentPage.blocks[0].blocks) {
      d =
        data.result.data.contentfulContentPage.blocks[0].blocks[1].lists[0]
          .listObjects;
    } else {
      d =
        data.result.data.contentfulContentPage.blocks[1].blocks[1].lists[0]
          .listObjects;
    }

    return this.transferService.transferRestaurantsToPois(d);
  }

  async getRides(): Promise<Poi[]> {
    const data: any = await this.getData("/page-data/en/rides/page-data.json");

    let d: null;
    if (data.result.data.contentfulContentPage.blocks[0].blocks) {
      d =
        data.result.data.contentfulContentPage.blocks[0].blocks[0].lists[0]
          .listObjects;
    } else {
      d =
        data.result.data.contentfulContentPage.blocks[1].blocks[0].lists[0]
          .listObjects;
    }

    const rides = this.transferService.transferRidesToPois(d);

    const waitData = await this.getWaitData();

    rides.map((r) => {
      const wait = waitData.find((w) => w.attractionId === r.original.rideId);

      if (wait) {
        r.currentWaitTime = wait.queueTime;
      }

      return r;
    });

    return rides;
  }

  async getPois(): Promise<Poi[]> {
    const promises = [this.getRides(), this.getRestaurants()];

    return [].concat.apply([], await Promise.all(promises));
  }

  async getData(route: string): Promise<AttraktionerResponseInterface> {
    const baseURL = this.configService.get("GRONA_LUND_API_URL");
    const url = `${baseURL}${route}`;

    return this.httpService
      .get<AttraktionerResponseInterface>(url)
      .toPromise()
      .then((value) => {
        return value.data;
      })
      .catch((exception) => {
        Sentry.captureException(exception);
        console.error(exception);
        throw new InternalServerErrorException(exception);
      });
  }

  async getWaitData(): Promise<any> {
    const url = `https://prs-cdp-prod-webapiproxy.azurewebsites.net/api/glt/QueueTimes/`;

    return this.httpService
      .get(url)
      .toPromise()
      .then((value) => {
        return value.data;
      })
      .catch((exception) => {
        Sentry.captureException(exception);
        console.error(exception);
        return [];
      });
  }

  async getOpeningTimes(): Promise<ThemeParkOpeningTimes[]> {
    const dateToday = moment().format("YYYY-MM-DD");
    const dateTo = moment().add(1, "month").format("YYYY-MM-DD");

    const url = `https://prs-cdp-prod-webapiproxy.azurewebsites.net/api/glt/purchaseflows/?purchaseFlowIds=51&dateFrom=${dateToday}&dateTo=${dateTo}&locale=en`;

    return this.httpService
      .get(url)
      .toPromise()
      .then((value) => {
        if (!value.data[0].calendar) {
          return [];
        }

        return value.data[0].calendar.map((day) => {
          const open = moment(day.opens);
          const close = moment(day.closing);

          return {
            date: day.date,
            events: [],
            openingTimes: [
              {
                open: day.opens,
                openTime: open.format("HH:mm:ss"),
                close: day.closing,
                closeTime: close.format("HH:mm:ss"),
              },
            ],
          };
        });
      })
      .catch((exception) => {
        Sentry.captureException(exception);
        console.error(exception);
        return [];
      });
  }
}
