export interface PoiFact {
  id: string;
  type:
    | 'build_in'
    | 'length'
    | 'speed'
    | 'height'
    | 'duration'
    | 'manufacturer'
    | 'scene_count'
    | 'cars_count'
    | 'g_forces'
    | 'capacity'
    | 'inversion_count'
    | 'passengers_per_car'
    | string;
  description?: string;
  content?: string;
  value?: string;
}
