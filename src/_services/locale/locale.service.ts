import { BadRequestException } from '@nestjs/common';
import * as Sentry from '@sentry/nestjs';

export class LocaleService {
  private currentLang: 'en' | 'es' | 'nl' | 'de' | 'fr' = null;

  public getAvailableLocales() {
    return [
      {
        code: 'en',
        iso: 'en-US',
        countryFlag: 'gb',
      },
      {
        code: 'nl',
        iso: 'nl-NL',
        countryFlag: 'nl',
      },
      {
        code: 'es',
        iso: 'es-ES',
        countryFlag: 'es',
      },
      {
        code: 'de',
        iso: 'de-DE',
        countryFlag: 'de',
      },
      {
        code: 'fr',
        iso: 'fr-FR',
        countryFlag: 'fr',
      },
      {
        code: 'da',
        iso: 'da-DK',
        countryFlag: 'da',
      }];
  }

  public getLocale(): 'en' | 'es' | 'nl' | 'de' | 'fr' | 'da' {
    return this.currentLang ?? 'en';
  }

  /**
   * Set the locale of the request
   * @param locale
   */
  public setLocale(locale: string) {
    const selectedLocale = this.getAvailableLocales().find((l) => l.iso === locale);

    if (!selectedLocale) {
      throw new BadRequestException(`Locale "${locale}" not supported`);
    }

    Sentry.setTag('locale', 'locale');

    // @ts-ignore
    this.currentLang = selectedLocale.code;
  }
}
