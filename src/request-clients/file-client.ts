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

    const countryList = countries.map(country =>
      Object.fromEntries(fields.map(field => [field, country[field]])),
    );

    return Promise.resolve(countryList as unknown as ICountry[]);
  }
  public callCountryByName(name: string): Promise<ICountry> {
    return Promise.resolve(
      queryClient
        .getQueryData<ICountry[]>(['countryFileList'])
        ?.find(country => country.name.common === name),
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
      const response = await fetch(constants.CountriesJsonFilePath);

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
