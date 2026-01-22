import type { ICountry } from './providers/types';
import i18n from '@i18n-next/i18n';
import constants from './constants.service';

class CountryService {
  public getCountriesBySelection(
    countries: ICountry[],
    selectedRegion: string,
    searchQuery?: string,
  ): ICountry[] {
    return countries?.filter(
      country =>
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
          .map(currency => currency.name)
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
      borderCodes?.map?.(borderCode =>
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
}

const countryService = new CountryService();
export default countryService;
