export interface ParqueWarnerResponseInterface {
  'facets': ParqueWarnerResponseFacetInterface[],
  'facets_range': [],
  'matches': number,
  'docs': ParqueWarnerResponseDocInterface[]
}

export interface ParqueWarnerResponseFacetInterface {
  name: string,
  values: {
    name: string,
    count: number
  }[]
}

export interface ParqueWarnerResponseDocInterface {
  'id': string,
  'template_s': string,
  'type_s': 'attractions' | 'events' | 'stores' | 'restaurants',
  'attractionName_s': string,
  'briefDescription_s': string,
  'descriptionTitle_s': string,
  'description_s': string,
  'mainImage_s': string,
  'altImage_s': string,
  'intensity_ss': ParqueWarnerAtraccionesResponseIntensity[],
  'intensity_level_s': string,
  'checkIntensity_b': boolean,
  'typeAttracction_ss'?: ParqueWarnerResponseAttractionType[],
  'checkTypeAttracction_b': boolean,
  'checkAgeRecomendation_b': boolean,
  'theme-areas_ss': string[],
  'checkThemeArea_b': boolean,
  'fast-pass_ss': ParqueWarnerAtraccionesResponseFastPass[],
  'checkfastPass_b': boolean,
  'openFrom_s': string,
  'closeTime_s': string,
  'checkOpeningSeason_b': boolean,
  'checkMinAge_b': boolean,
  'checkMaxSpeed_b': boolean,
  'checkMaxHeight_b': boolean,
  'minHeight_ss': string[],
  'maxHeight_ss': string[],
  'checkMinHeight_b': boolean,
  'checkMaxWeight_b': boolean,
  'checkMinWeight_b': boolean,
  'adultCompaninon_b': boolean,
  'howToRide_ss': string[],
  'waterShoes_b': boolean,
  'accesibility_b': boolean,
  'longitude_s': string,
  'latitude_s': string,
  'waitTime_b': boolean,
  'guideNote_s': string,
  'galleryPhoto_ss': string[],
  'tags_ss': ParqueWarnerResponseTag[],
  'h1_txt_en': string,
  'hl_title_txt_en_mv': string[],
  'autosuggest_lang': string[],
  'h1_txt_sort_en': string,
  'h2_txt_en': string,
  'hl_body_txt_en_mv': string[],
  'p_richtext_txt_en': string,
  'tipology_name_s': string,
  'tipology_title_s': string,
  'tipology_value_f': number,
  'tipology_search_s': string,
  'collection': string[],
  'path': string,
  'realpath': string[],
  'index_date': string,
  'lang': string[],
  'h4_txt_en': string,
  'button_label_txt_en': string,
  'button_link_txt_en': string,
  'alt_image_txt_en': string,
  'jcr_title': string[],
  '_version_': number,
  'final_hl_title': string,
  'final_hl_summary': string,

  // Show Response
  'typeShow_ss'?: ParqueWarnerResponseShowType[],
  "eventName_s": "Aquaman Nighttime Spectacular",
  "services_ss": [
    "product.list.service.disability.access"
  ],
  "checkServices_b": false,
  "checkTypeShow_b": false,
  "age-recomendation_ss": [
    "All audiences"
  ],
  "checkPayment_b": false,
  "checkTypeDinning_b": false,
  "openingSeason_ss": [
    "Summer"
  ],
  "priorReservation_b": false,
  "locationIndications_s": "Movie World Studios",
  "checkLocationIndications_b": false,
  "startDate_date": "2021-07-31T15:47:00.000Z",
  "finishDate_date": "2021-08-31T15:48:00.000Z",
  "start_s": "31-07",
  "finish_s": "31-08",
  "dateComparation_b": false,
  "featuredShow_b": false,
  "monday_b": true,
  "tuesday_b": true,
  "wednesday_b": true,
  "thrusday_b": true,
  "friday_b": true,
  "saturday_b": true,
  "sunday_b": true,
  "checktime_b": false,
  "slot_s": "20 min.",
  "checkslot_b": false,

  // Stores
  "storeName_s": string,
  "checkTypeStore_b": boolean,
  "checkAvaibleProducts_b": boolean,
  "email_s": string,
  "checkemail_b": boolean,
  "telephone_s": string,
  "checktelephone_b": boolean,

  // Restaurants
  "restaurantName_s": "Beverly Hills Bakery",
  "type-of-restaurant_ss": [
    "Kiosks and coffee shops"
  ],
  "checkrestaurantType_b": true,
  "checkmealPlans_b": false,
  "type-of-food_ss": [
    "Celiac"
  ],
  "checkfoodType_b": false,
  "checkattentionto_b": false,
  "price_ss": [
    "€€"
  ],
  "checkprice_b": true,
  "checkBabyCare_b": false,
  "menu_s": "/content/warner/en/descubre-el-parque/planea-tu-visita/donde-comer/restaurantes/beverly-hills-bakery/carta",
  "additionalOpeningInformation_s": "Closed",
  "thematicDinner_s": "Closed",
  "slotThematicDinner_s": "Closed",
}

export enum ParqueWarnerAtraccionesResponseIntensity {
  Soft = 'Soft',
  Moderate = 'Moderate',
  Intense = 'Intense'
}

export enum ParqueWarnerAtraccionesResponseFastPass {
  'Pass Correcaminos Five ' = 'Pass Correcaminos Five',
  'Pass Correcaminos Platinum' = 'Pass Correcaminos Platinum'
}

export enum ParqueWarnerResponseTag {
  attractions = 'attractions',
  product = 'product',
  'Accompanied by an adult' = 'Accompanied by an adult',
  'accompanied-by-an-adult' = 'accompanied-by-an-adult',
  'Pass Correcaminos Five' = 'Pass Correcaminos Five',
  'Pass Correcaminos Platinum' = 'Pass Correcaminos Platinum',
  'Cartoon Village' = 'Cartoon Village',
  'Soft' = 'Soft',
  'soft' = 'soft',
  'Machine' = 'Machine',
  'Moderate' = 'Moderate',
  'moderate' = 'moderate',
  '105 cm' = '105 cm',
  'Alone Child' = 'Alone Child',
  'alone-child' = 'alone-child',
  'DC Super Heroes World' = 'DC Super Heroes World',
  'Intense' = 'Intense',
  'Rollercoaster' = 'Rollercoaster',
  'intense' = 'intense',
  '120 cm' = '120 cm',
  'Water' = 'Water',
  '140 cm' = '140 cm',
  'Movie World Studios' = 'Movie World Studios',
  'Old West Territory' = 'Old West Territory',
  'Tour' = 'Tour',
  '130 cm' = '130 cm',
  '132 cm' = '132 cm',
  'Children (9-13 y.o.) and Families' = 'Children (9-13 y.o.) and Families',
  'Driving' = 'Driving',
  '110 cm' = '110 cm',
  '115 cm' = '115 cm',
  '121 cm' = '121 cm',
  '122 cm' = '122 cm',
  '137 cm' = '137 cm',
  '99 cm' = '99 cm',
  'Kids and families' = 'Kids and families',
  'Teenagers & Adults' = 'Teenagers & Adults'
}

export enum ParqueWarnerResponseAttractionType {
  'Machine' = 'Machine',
  'Rollercoaster' = 'Rollercoaster',
  'Water' = 'Water',
  'Tour' = 'Tour',
  'Driving' = 'Driving'
}

export enum ParqueWarnerResponseShowType {
  'Street Animation' = 'Street Animation',
  'Musical show' = 'Musical show',
  'Walk in and Meet & Greet' = 'Walk in and Meet & Greet',
  'Terror Show' = 'Terror Show',
  'Action show' = 'Action show'
}
