export interface DippieDoeRide {
  id: string,
  title: string,
  description: string,
  area: string,
  minSizeWithEscort?: number,
  minSizeWithoutEscort?: number,
  maxSize?: number,
  minAge?: number,
  maxAge?: number,
  image_url?: string,
  video_url?: string,
  lat?: number;
  lng?: number;
}
