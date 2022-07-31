export interface ApenheulAapABCResponseInterface {
  'Items': ApenheulAapABCItemResponseInterface[],
  'TotalCount': number
}

export interface ApenheulAapABCItemResponseInterface {
  'Title': string,
  'Subtitle': string,
  'Theme': string,
  'ImageUrl': string,
  'Url': string
}
