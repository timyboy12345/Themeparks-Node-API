export interface BobbejaanlandApiResponseInterface {
  'matches': number,
  'docs': BobbejaanlandApiResponseItemInterface[]
}

export interface BobbejaanlandApiResponseItemInterface {
  'id': string,
  'template_s': string,
  'type_s': string,
  'attractionName_s': string,
  'briefDescription_s': string,
  'descriptionTitle_s': string,
  'description_s': string,
  'mainImage_s': string,
  'altImage_s': string,
  'intensity_ss': string[],
  'intensity_level_s': 'soft' | 'moderate' | 'intense',
  'checkIntensity_b': boolean,
  'typeAttracction_ss': string[],
  'checkTypeAttracction_b': boolean,
  'age-recomendation_ss': string[],
  'checkAgeRecomendation_b': boolean,
  'checkThemeArea_b': boolean,
  'checkfastPass_b': boolean,
  'openingSeason_ss': string[],
  'checkOpeningSeason_b': boolean,
  'checkMinAge_b': boolean,
  'checkMaxSpeed_b': boolean,
  'checkMaxHeight_b': boolean,
  'minHeight_ss': string[],
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
  'galleryPhoto_ss': string[],
  'tags_ss': string[],
  'h1_txt_nl': string,
  'hl_title_txt_nl_mv': string[],
  'autosuggest_lang': string[],
  'h1_txt_sort_nl': string,
  'h2_txt_nl': string,
  'hl_body_txt_nl_mv': string[],
  'p_richtext_txt_nl': string,
  'tipology_name_s': string,
  'tipology_title_s': string,
  'tipology_value_f': 40.0,
  'tipology_search_s': string,
  'collection': string[],
  'path': string,
  'realpath': string[],
  'index_date': string,
  'lang': string[],
  'button_label_txt_nl': string,
  'button_link_txt_nl': string,
  'alt_image_txt_nl': string,
  'jcr_title': string[],
  '_version_': number,
  'final_hl_title': '',
  'final_hl_summary': '',
  'theme-areas_ss': string[]
  'maxHeight_ss': string[]
}