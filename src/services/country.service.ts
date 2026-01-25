import i18n from '@i18n-next/i18n';

import constants from './constants.service';
import type { ICountry } from './providers/types';

class CountryService {
  public getCountriesBySelection(
    countries: ICountry[],
    selectedRegion: string,
    searchQuery?: string,
  ): ICountry[] {
    return countries?.filter(
      (country) =>
        (!selectedRegion || country.region === selectedRegion) &&
        (!searchQuery ||
          this.getCountryNameLabel(country)
            .toLowerCase()
            .includes(searchQuery)),
    );
  }

  public getCountryName(country: ICountry) {
    return country?.name?.common.trim();
  }

  public getCountryNameLabel(country: ICountry) {
    const lang = constants.Iso6391To6393LangMapper[i18n.language];
    const countryNameByLang = country?.translations?.[lang]?.common;
    return countryNameByLang || this.getCountryName(country);
  }

  public isCountriesListAvailable(countries: ICountry[]) {
    return Array.isArray(countries) && !!countries.length;
  }

  public getCurrencies(currencies: ICountry['currencies']): string {
    return currencies
      ? Object.values(currencies)
          .map((currency) => currency.name)
          .join(', ')
      : null;
  }

  public getLanguages(languages: ICountry['languages']): string {
    return languages ? Object.values(languages).join(', ') : null;
  }

  public getBorderCountries(
    countriesList: ICountry[],
    borderCodes: ICountry['borders'],
  ): ICountry[] {
    return (
      borderCodes?.map?.((borderCode) =>
        countriesList?.find(({ cca3 }) => cca3 === borderCode),
      ) || []
    );
  }

  public getRegions(countriesList: ICountry[]) {
    return countriesList?.reduce<string[]>(
      (acc: string[], country: ICountry) => {
        if (country.region && !acc.includes(country.region)) {
          acc.push(country.region);
        }
        return acc;
      },
      [],
    );
  }

  public getEmojiForImg(
    emoji: string,
    paramSvgData?: { x?: string; y?: string; size?: number },
  ): string {
    const defaultSvgData = {
      size: 90,
      x: '50',
      y: '0.82em',
    };
    const svgData = Object.assign({}, defaultSvgData, paramSvgData);
    const safeEmoji = emoji || '🌍';
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <text y="${svgData.y}" font-size="${svgData.size}" text-anchor="middle" x="${svgData.x}">${safeEmoji}</text>
    </svg>
  `.trim();
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }

  public createImg(flagUrl: string, emoji: string): HTMLImageElement {
    const testImg = new Image();
    testImg.src = flagUrl;
    testImg.onerror = () => {
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <text y="0.9em" font-size="90">${emoji}</text>
        </svg>
      `;

      testImg.src = encodeURIComponent(svg);
      // faviconLink.href = `data:image/svg+xml,${encoded}`;
      // faviconLink.type = 'image/svg+xml';
    };
    return testImg;
  }
}

const countryService = new CountryService();
export default countryService;
