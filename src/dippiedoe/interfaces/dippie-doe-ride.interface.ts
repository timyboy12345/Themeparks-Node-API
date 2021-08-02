export interface DippieDoeRide {
  id: string,
  title: string,
  description: string,
  area: string,
  minLength?: number,
  maxLength?: number,
  minAge?: number,
  maxAge?: number,
  minLengthAlone?: number,
  image_url?: string,
  lat?: number;
  lng?: number;
}
