import type { CountryFields, ICountry } from '../providers/types';
import constants from '../services/constants.service';
import logger from '../services/logger.service';
import queryClient from '../tanstack-query-client/tanstack-client';
import type { IRequestClient } from './types';

class FileClient implements IRequestClient {
  public init(): Promise<void> {
    return this.preloadAllCountries();
  }

  public callAllCountries(fields: CountryFields[]): Promise<ICountry[]> {
    const countries =
      queryClient.getQueryData<ICountry[]>(['countryFileList']) ?? [];

    const countriesList = countries.map(country =>
      Object.fromEntries(fields.map(field => [field, country[field]])),
    );

    return Promise.resolve(countriesList as unknown as ICountry[]);
  }
  public callCountryByCca3Code(countryCca3Code: string): Promise<ICountry> {
    return Promise.resolve(
      queryClient
        .getQueryData<ICountry[]>(['countryFileList'])
        ?.find(country => country.cca3 === countryCca3Code),
    );
  }

  private async preloadAllCountries(): Promise<void> {
    await queryClient.fetchQuery({
      queryKey: ['countryFileList'],
      queryFn: () => this.fetchAllCountriesFromFile(),
    });
  }

  private async fetchAllCountriesFromFile(): Promise<ICountry[]> {
    try {
      const response = await fetch(constants.CountriesJsonFilePath, {
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      logger.logError('Failed to load countries from file', error);
      throw error;
    }
  }
}

const fileClient = new FileClient();
export default fileClient;
