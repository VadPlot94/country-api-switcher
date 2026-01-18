import type { CountryFields, ICountry } from '../providers/types';

export interface IRequestClient {
  init(): Promise<void>;
  callAllCountries(fields: CountryFields[]): Promise<ICountry[]>;
  callCountryByCca3Code(countryCca3Code: string): Promise<ICountry>;
}
