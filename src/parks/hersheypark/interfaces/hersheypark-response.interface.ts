export interface HersheyparkResponseItem {
  id: number,
  name: string,
  description: string,
  status: number,
  parkarea: {
    id: number,
    name: string
  },
  rating: {
    id: number,
    name: string,
    description: string,
    image: string
  },
  latitude: number,
  longitude: number,
  keywords: string,
  bgColor: string,
  fgColor: string,
  types: {id: number, name: string}[],
  restrictions: string[],
  accessibility: string,
  open: boolean,
  statusHours: undefined,
  factMaxSpeed: string,
  factHeight: string,
  factLength: string,
  factTime: string,
  thumbnail: string,
  images: string[],
  fasttrack: boolean,
  // YouTube video id's
  videos: string[],
  share: {
    text: string,
    url: string
  }
}
