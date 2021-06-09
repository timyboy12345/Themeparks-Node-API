import { Translation } from './translation.interface';

export interface LocalizedDataInterface {
  localizedTitles?: Translation;
  localizedTitle?: string;
  localizedSubtitles?: Translation;
  localizedSubtitle?: string;
  localizedDescriptions?: Translation;
  localizedDescription?: string;
}
