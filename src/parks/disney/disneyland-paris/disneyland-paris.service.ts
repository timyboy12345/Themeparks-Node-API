import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { gql, request } from 'graphql-request';
import { ParkType, ThemePark } from '../../../_interfaces/park.interface';
import { ThemeParkSupports } from '../../../_interfaces/park-supports.interface';
import { Poi } from '../../../_interfaces/poi.interface';
import { DisneylandParisTransferService } from './disneyland-paris-transfer/disneyland-paris-transfer.service';
import { DisneylandParisAttraction } from './interfaces/disneyland-paris-attraction.interface';
import { ThroughPoisThemeParkService } from '../../../_services/themepark/through-pois-theme-park.service';

@Injectable()
export class DisneylandParisService extends ThroughPoisThemeParkService {
  private readonly _disneyLandParis: string;

  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService,
              private readonly disneylandParisTransferService: DisneylandParisTransferService) {
    super();

    this._disneyLandParis = this.configService.get('DISNEYLAND_PARIS_API_URL');
  }

  getInfo(): ThemePark {
    return {
      id: 'disneyland_paris',
      name: 'Disneyland Paris',
      description: 'Disneyland Paris, eerst Euro Disney Resort en daarna Disneyland Resort Paris, is een attractiepark- en recreatiecomplex in Marne-la-Vallée, een stad in de banlieue van de Franse hoofdstad Parijs.',
      countryCode: 'fr',
      image: 'https://www.sortiraparis.com/images/80/87950/484853-visuels-disneyland-paris-chateau.jpg',
      parkType: ParkType.THEMEPARK
    };
  }

  getSupports(): ThemeParkSupports {
    return {
      supportsPois: true,
      supportsRestaurantOpeningTimes: false,
      supportsRestaurants: true,
      supportsRideWaitTimes: false,
      supportsRides: true,
      supportsShowTimes: false,
      supportsShows: true,
      supportsPoiLocations: true,
      supportsShops: true,
      supportsShopOpeningTimes: false,
      supportsRideWaitTimesHistory: false,
      supportsOpeningTimesHistory: false,
      supportsOpeningTimes: false,
 supportsAnimals: true    };
  }

  async getPois(): Promise<Poi[]> {
    return this
      .request()
      .then((disneyLandParisPois: DisneylandParisAttraction[]) =>
        this.disneylandParisTransferService
          .transferPoisToPois(disneyLandParisPois.filter(poi => poi.location.id === 'P1')));
  }

  private request<T>(): Promise<any> {
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

    return request(this._disneyLandParis, query, variables).then((activitiesResponse) => {
      return activitiesResponse.activities;
    });
  }
}
