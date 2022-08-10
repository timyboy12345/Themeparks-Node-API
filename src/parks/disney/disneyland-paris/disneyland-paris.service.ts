import { HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { gql, request } from 'graphql-request';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { Poi, PoiStatus } from '../../../_interfaces/poi.interface';
import { DisneylandParisTransferService } from './disneyland-paris-transfer/disneyland-paris-transfer.service';
import { DisneylandParisAttraction } from './interfaces/disneyland-paris-attraction.interface';
import { ThroughPoisThemeParkService } from '../../../_services/themepark/through-pois-theme-park.service';
import { DisneylandParisWaitTimesResponseItemInterface } from './interfaces/disneyland-paris-wait-times-response-item.interface';
import * as Sentry from '@sentry/node';

@Injectable()
export class DisneylandParisService extends ThroughPoisThemeParkService {
  private readonly _disneyLandParis: string;
  private readonly _disneyLandParisWaitTimesUrl: string;
  private readonly _disneylandParisWaitTimesApiKey: string;

  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService,
              private readonly disneylandParisTransferService: DisneylandParisTransferService) {
    super();

    this._disneyLandParis = this.configService.get('DISNEYLAND_PARIS_API_URL');
    this._disneyLandParisWaitTimesUrl = this.configService.get('DISNEYLAND_PARIS_WAIT_TIMES_URL');
    this._disneylandParisWaitTimesApiKey = this.configService.get('DISNEYLAND_PARIS_WAIT_TIMES_API_KEY');
  }

  getInfo(): ThemePark {
    return {
      id: 'disneyland_paris',
      name: 'Disneyland Paris',
      description: 'Disneyland Paris, eerst Euro Disney Resort en daarna Disneyland Resort Paris, is een attractiepark- en recreatiecomplex in Marne-la-Vallée, een stad in de banlieue van de Franse hoofdstad Parijs.',
      countryCode: 'fr',
      image: 'https://www.sortiraparis.com/images/80/87950/484853-visuels-disneyland-paris-chateau.jpg',
      parkType: ParkType.THEMEPARK,
      location: {
        lat: 48.870321,
        lng: 2.779672,
      },
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: true,
      supportsRides: true,
      supportsShowTimes: false,
      supportsShows: true,
      supportsPoiLocations: true,
      supportsShops: true,
      supportsShopOpeningTimes: false,
      supportsRideWaitTimesHistory: true,
      supportsOpeningTimesHistory: false,
      supportsOpeningTimes: false,
      supportsAnimals: false,
    };
  }

  async getPois(): Promise<Poi[]> {
    return this
      .graphQLRequest()
      .then(async (disneyLandParisPois: DisneylandParisAttraction[]) => {
        const pois = this
          .disneylandParisTransferService
          .transferPoisToPois(disneyLandParisPois.filter(poi => poi.location.id === 'P1'));

        const waitTimes = await this.waitTimesRequest().then();
        waitTimes.forEach((waitTime) => {
          const waitTimePoi = pois.find((p) => p.id === waitTime.entityId);

          if (waitTimePoi) {
            waitTimePoi.currentWaitTime = parseInt(waitTime.postedWaitMinutes);

            switch (waitTime.status) {
              case 'OPERATING':
                waitTimePoi.state = PoiStatus.OPEN;
                break;
              case 'REFURBISHMENT':
                waitTimePoi.state = PoiStatus.MAINTENANCE;
                break;
              default:
                waitTimePoi.state = PoiStatus.UNDEFINED;
                break;
            }
          }
        });

        return pois;
      });
  }

  private graphQLRequest<T>(): Promise<any> {
    const variables = {
      'market': 'en-en',
      'types': [
        'Attraction',
        'DiningEvent',
        'DinnerShow',
        'Entertainment',
        'Event',
        'GuestService',
        'Recreation',
        'Resort',
        'Restaurant',
        'Shop',
        'Spa',
        'Tour',
      ],
    };

    const query = gql`query($market: String, $types: [String]) {
        activities(market: $market, types: $types) {
            id        contentType: __typename
            entityType
            contentId
            id
            url
            pageLink {
                ...pageLink
            }
            hideFunctionality
            name
            squareMediaMobile {
                ...media
            }
            subType
            location {
                ...location
            }
            coordinates {
                ...coordinates
            }
            closed
            schedules {
                language
                startTime
                endTime
                date
                status
                closed
            }

            heroMedia {
                url
            }

            ... on Attraction {
                age {
                    ...facet
                }
                height {
                    ...facet
                }
                interests {
                    ...facet
                }
                photopass
                fastPass
                singleRider
                mobilityDisabilities {
                    ...facet
                }
                serviceAnimals {
                    ...facet
                }
                physicalConsiderations {
                    ...facet
                }
            }
        }
    }
    fragment facet on Facet {
        id
        value
        urlFriendlyId
        iconFont
    }
    fragment location on Location {
        id
        value
        urlFriendlyId
        iconFont
        pageLink {
            ...pageLink
        }
    }
    fragment coordinates on MapCoordinates {
        lat
        lng
        type
    }
    fragment media on Media {
        url
        alt
    }
    fragment pageLink on PageLink {
        tcmId
        title
        regions {
            ...region
        }
    }
    fragment region on Region {
        contentId
        templateId
        schemaId
    }
    `;

    return request(this._disneyLandParis, query, variables)
      .then((activitiesResponse) => {
      return activitiesResponse.activities;
    })
      .catch((reason) => {
        Sentry.captureException(reason);
        console.log(reason);
        throw new InternalServerErrorException(reason);
      });
  }

  public waitTimesRequest(): Promise<DisneylandParisWaitTimesResponseItemInterface[]> {
    const url = this._disneyLandParisWaitTimesUrl + '/prod/v1/waitTimes';

    return this.httpService
      .get<DisneylandParisWaitTimesResponseItemInterface[]>(url, {
        headers: {
          'x-api-key': this._disneylandParisWaitTimesApiKey,
        },
      })
      .toPromise()
      .then((data) => data.data)
      .catch((reason) => {
        Sentry.captureException(reason);
        console.log(reason);
        return [];
      });
  }
}
