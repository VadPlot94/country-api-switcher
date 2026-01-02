import type { CountryFields, ICountry } from '../providers/types';

export interface IRequestClient {
  init(): Promise<void>;
  callAllCountries(fields: CountryFields[]): Promise<ICountry[]>;
  callCountryByName(name: string): Promise<ICountry>;
}
