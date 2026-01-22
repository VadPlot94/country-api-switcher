import fileClient from '../request-clients/file-client';
import httpClient from '../request-clients/http-client';
import type { IRequestClient } from '../request-clients/types';
import constants from '../constants.service';
import logger from '../logger.service';
import type { CountryFields, ICountry } from './types';

class CountryApiProvider {
  public constructor(private client: IRequestClient) {}

  public async getAllCountries(fields: CountryFields[]): Promise<ICountry[]> {
    const countriesList = await this.getAllCountriesByFields(fields);
    if (!Array.isArray(countriesList) || !countriesList.length) {
      throw new Error('Failed to get countries list');
    }
    return countriesList;
  }

  private async getAllCountriesByFields(
    fields: CountryFields[],
  ): Promise<ICountry[]> {
    if (!Array.isArray(fields) || fields.length > constants.MaxApiFieldsCount) {
      logger.logError(
        `Invalid input fields number.
        I should contain at least 1 filed but not more then ${constants.MaxApiFieldsCount}.
        `,
      );
    }

    const countriesList: ICountry[] = await this.client
      .callAllCountries(fields)
      .catch(err => {
        logger.logError(err);
        return null;
      });

    logger.logInfo('Successful get countries list with fields', fields);

    return countriesList;
  }

  public async getCountryDescriptionCca3Code(
    countryCca3Code: string,
  ): Promise<ICountry> {
    const countryInfo = await this.getCountryByCca3Code(countryCca3Code);
    if (!countryInfo) {
      throw new Error('Failed to get country info');
    }
    return countryInfo;
  }

  private async getCountryByCca3Code(
    countryCca3Code: string,
  ): Promise<ICountry> {
    const country: ICountry = await this.client
      .callCountryByCca3Code(countryCca3Code)
      .catch(err => {
        logger.logError(err);
        return null;
      });
    return country;
  }
}

const countryApiProvider = new CountryApiProvider(httpClient);
const countryFileProvider = new CountryApiProvider(fileClient);
export default countryApiProvider;
export { countryFileProvider };
