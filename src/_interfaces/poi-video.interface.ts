export interface PoiVideo {
  platform: 'YOUTUBE' | 'VIMEO' | 'FACEBOOK' | 'URL' | 'OTHER',
  embed_id?: string,
  full_url?: string,
}
